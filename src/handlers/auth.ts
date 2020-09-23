import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import passport from "passport";
import { ApiResponse } from "../models/apiResponses";

export const loginUser: RequestHandler = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      const response: ApiResponse = {
        message: "No user found!",
        payload: null,
        error: null
      };
      res.status(200).json(response);
    } else {
      req.logIn(user, err => {
        if (err) throw err;
        const response: ApiResponse = {
          message: null,
          payload: req.user, // req.user contains the whole user object
          error: null
        };
        res.status(200).json(response);
      });
    }
  })(req, res, next);
};

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userAlreadyExists = await User.findOne({ username: username });
    let response: ApiResponse;

    if (username.length < 4) {
      response = {
        message: "Please use a username longer than 3 characters",
        error: null,
        payload: null
      };
      return res.status(200).json(response);
    }

    if (password.length < 8) {
      response = {
        message: "Please use a password at least 7 characters long",
        error: null,
        payload: null
      };
      return res.status(200).json(response);
    }

    if (userAlreadyExists) {
      response = {
        message: "Username already taken! Please pick another one!",
        payload: null,
        error: null
      };
      return res.status(200).json(response);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      response = {
        message: null,
        payload: newUser,
        error: null
      };
      return res.status(200).json(response);
    }
  } catch (err) {
    return next(err);
  }
};

export const logoutUser: RequestHandler = (req, res, next) => {
  try {
    req.logOut();
    return res.status(200).json("Logged you out!");
  } catch (err) {
    return next(err);
  }
};
