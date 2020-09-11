"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialisePassport = void 0;
var passport_local_1 = require("passport-local");
var user_1 = require("./models/user");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
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
exports.initialisePassport = function (passport) {
    var UserCastToAny = user_1.User;
    passport.use(new passport_local_1.Strategy(function (username, password, done) {
        user_1.User.findOne({ username: username }, function (err, user) {
            if (err)
                throw err;
            if (!user)
                return done(null, false);
            bcryptjs_1.default.compare(password, user.password, function (err, result) {
                if (err)
                    throw err;
                if (result === true) {
                    return done(null, user);
                }
                else
                    return done(null, false);
            });
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        user_1.User.findOne({ _id: id }, function (err, user) {
            done(err, user);
        });
    });
};
