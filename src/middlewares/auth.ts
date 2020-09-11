import passport from "passport";

export const authenticateMiddleware = () =>
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  });
