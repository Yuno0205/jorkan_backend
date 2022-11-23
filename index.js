const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const app = express();
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const port = 5000
const passport = require("passport");

const authRoute = require("./routes/auth");

app.use(morgan('combined'))

dotenv.config();

//Connect with DB
mongoose.connect((process.env.MONGO_DB_URL) , () => {
    console.log("Connected to Monggo DB !");
})

app.use(
  cookieSession({ name: "session", keys: ["Yuno"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })
);

app.use("/auth", authRoute);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})