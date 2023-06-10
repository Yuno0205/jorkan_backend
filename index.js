const express = require("express");
var session = require("express-session");
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
const productRoute = require("./routes/product");
const optionRoute = require("./routes/option");
const orderRoute = require("./routes/order");
const passport = require("passport");

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  cors({
    origin: "https://exquisite-arithmetic-961559.netlify.app",
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
app.set("trust proxy", 1);

app.use(
  session({
    name: "Yuno",
    secret: "nothowl",
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 10000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/options", optionRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello World! Howl is here !");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
