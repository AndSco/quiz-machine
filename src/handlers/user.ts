import { RequestHandler } from "express";
import { User } from "../models/user";

// export const createUser: RequestHandler = async (req, res, next) => {
//   try {
//     console.log("req body", req.body);
//     const { username, password } = req.body;
//     const newUser = await User.create({ username, password });

//     res.status(200).json({ message: "User created", user: newUser });
//   } catch (err) {
//     return next(err);
//   }
// };
