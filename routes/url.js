const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const validUrl = require("valid-url");

const Url = require("../models/URL");

//@routes    POST /api/url/shortren
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.baseURL;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({
      error: "Invalid base URL",
    });
  }

  //generate urlcode
  const urlCode = shortid.generate();

  //check longURl
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Server error",
      });
    }
  } else {
    return res.status(401).json({
      error: "Long url is invalid",
    });
  }
});

module.exports = router;
