const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passport");
const port = 5000;
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const passport = require("passport");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(morgan("combined"));

dotenv.config();

//Connect with DB
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

//
app.use(
  cookieSession({ name: "session", keys: ["Yuno"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
