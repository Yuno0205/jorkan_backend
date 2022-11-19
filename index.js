const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const app = express()
const port = 8000

app.use(morgan('combined'))
app.use(cors())
app.use(morgan('common'))

dotenv.config();

//Connect with DB
mongoose.connect((process.env.MONGO_DB_URL) , () => {
    console.log("Connected to Monggo DB !");
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})