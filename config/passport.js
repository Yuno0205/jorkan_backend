const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        userId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        provider: profile.provider,
        accessToken: accessToken,
      };

      try {
        let user = await User.findOne({ userId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Token : " + accessToken);

      console.log(profile);

      const newUser = {
        userId: profile.id,
        displayName: profile.username,
        image: profile.photos[0].value,
        provider: profile.provider,
      };

      try {
        let user = await User.findOne({ userId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error("Error is :" + err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Token : " + accessToken);

      const picture = `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`;
      //   done(null, profile);
      const newUser = {
        userId: profile.id,
        displayName: profile.displayName,
        image: picture,
        provider: profile.provider,
      };

      try {
        let user = await User.findOne({ userId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error("Error is :" + err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
