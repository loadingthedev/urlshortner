const mongoose = require('mongoose');
const db = process.env.mongoURI

const connectDB = async ()=>{
    try {
        await mongoose.connect(db,{useNewUrlParser : true,useUnifiedTopology : true})
        console.log("DB connected");
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB