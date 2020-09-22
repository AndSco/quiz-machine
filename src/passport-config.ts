import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/user";
import bcrypt from "bcryptjs";

export const initialisePassport = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        // .populate("quizzes")
        // .exec();

        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else return done(null, false);
        });
      } catch (err) {
        throw err;
      }
    })
  );

  passport.serializeUser((user: { id: string }, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};
