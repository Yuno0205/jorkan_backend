const jwt = require("jsonwebtoken");
const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = "https://jorkan.vercel.app";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    // Xử lý lỗi nếu có
    if (req.authError) {
      return res
        .status(500)
        .json({ message: "Internal server error , pls check it again !" });
    }

    // Kiểm tra xem người dùng đã xác thực tồn tại hay không
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = {
      id: req.user._id,
    };
    const token = jwt.sign(payload, "HOWL_0205", { expiresIn: "3d" });
    res.json({ token });

    // //  Chuyển hướng người dùng về CLIENT_URL
    // res.redirect(CLIENT_URL);
  }
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
