const express = require("express");
const router = express.Router();

const Url = require("../models/URL");

//GET :code
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    console.log(url);

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(401).json({
        error: "No url Found",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
