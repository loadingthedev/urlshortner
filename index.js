require('dotenv').config()
const express = require('express')
const app = express()

//DB connection
const connectDB = require('./config/db');
connectDB()

app.use(express.json({ extended : false}))

//Define ROutes
app.use('/',require('./routes/index'))
app.use('/api/url',require('./routes/url'))

app.listen(process.env.PORT,()=> console.log(`Server is running on port ${process.env.PORT}`))