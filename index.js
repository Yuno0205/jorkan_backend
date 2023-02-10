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
const productRoute = require("./routes/product");
const optionRoute = require("./routes/option");
const orderRoute = require("./routes/order");
const passport = require("passport");

app.use(express.json());

app.use(
  cors({
    origin: "*",
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

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/options", optionRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
