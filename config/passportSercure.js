const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile);

      // const newUser = {
      //   userId: profile.id,
      //   displayName: profile.displayName,
      //   firstName: profile.name.givenName,
      //   lastName: profile.name.familyName,
      //   image: profile.photos[0].value,
      //   provider: profile.provider,
      // };

      // console.log("User is :" + newUser);

      // try {
      //   let user = await User.findOne({ userId: profile.id });

      //   if (user) {
      //     done(null, user);
      //     console.log("Đã có");
      //   } else {
      //     console.log("chưa có");
      //     user = await User.create(newUser);
      //     done(null, user);
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      console.log(profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});
