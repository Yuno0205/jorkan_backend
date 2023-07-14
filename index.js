const express = require("express");
var session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passport");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const optionRoute = require("./routes/option");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const passport = require("passport");

const { port, JWT_SECRET } = process.env;

app.use(express.json());
app.use(morgan("combined"));

dotenv.config();

app.use(
  cors({
    origin: ["https://jorkan.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

//
app.set("trust proxy", 1);

app.use(
  session({
    name: "Howl",
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24, //About 1 day
    },
  })
);

//Connect with DB
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/options", optionRoute);
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);

app.get("/", (req, res) => {
  res.send("Hello World! Howl is here !");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
