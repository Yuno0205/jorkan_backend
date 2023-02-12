const router = require("express").Router();
const passport = require("passport");
// const { OAuth2Client } = require("google-auth-library");
const CLIENT_URL = "https://sensational-toffee-a5007d.netlify.app/";

router.get("/login/success", (req, res) => {
  console.log("Request in success :", req);
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: "Successfull",
      user: req?.user,
    });
  } else {
    return res.status(500).json({
      success: true,
      message: "User not found",
      user: req?.user,
    });
  }
});
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// router.post("/login/google", async (req, res, next) => {
//   //const {idToken} = req.body;
//   console.log("idToken", idToken);
//   const ticket = await client.verifyIdToken({
//     idToken: idToken,
//     audience: process.env.GOOGLE_CLIENT_ID,
//   });
//   console.log("ticket nè", ticket);
//   const { name, family_name, picture, sub, email } = ticket.getPayload();
//   let user = await User.findOne({ email });
//   if (!user) {
//     user = await User.create({
//       name,
//       email,
//       avatar: picture,
//       googleId: sub,
//       password: 123,
//       displayName: toSlug(name),
//     });
//   }
//   const accessToken = await user.generateToken();

// return sendResponse(
//     res,
//     200,
//     true,
//     { user, accessToken },
//     null,
//     "Successfully sign up with google"
//   );//
//     "Successfully sign up with google"
//   );//
// });
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL + "/login");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
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
