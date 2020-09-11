import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/user";
import bcrypt from "bcryptjs";

// const authenticateUser = async (
//   username: string,
//   password: string,
//   done: any
// ) => {
//   const userFound = await User.findOne({ username: username });
//   if (!userFound) {
//     return done(null, false, { message: "No user found" });
//   }
//   try {
//     if (await bcrypt.compare(password, userFound.password)) {
//       return done(null, userFound);
//     } else {
//       return done(null, false, { message: "Wrong password" });
//     }
//   } catch (err) {
//     return done(err);
//   }
// };

export const initialisePassport = (passport: PassportStatic) => {
  const UserCastToAny: any = User;
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else return done(null, false);
        });
      });
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
