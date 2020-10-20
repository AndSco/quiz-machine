import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import passport from "passport";
import { ApiResponse } from "../models/apiResponses";

export class SuccessfulResponse implements ApiResponse {
  public status: string = "success";
  public message = null;
  public error = null;
  constructor(public payload: any) {}
}

export class UnSuccessfulResponse implements ApiResponse {
  public status = "failure";
  public payload = null;
  public error = null;
  constructor(public message: string) {}
}

export class ErrorResponse implements ApiResponse {
  public status = "failure";
  public payload = null;
  public message = null;
  constructor(public error: string) {}
}

export const loginUser: RequestHandler = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res
        .status(200)
        .json(
          new UnSuccessfulResponse("Wrong username or password. Try again!")
        );
    } else {
      req.logIn(user, err => {
        if (err) throw err;
        res.status(200).json(new SuccessfulResponse(req.user));
      });
    }
  })(req, res, next);
};

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userAlreadyExists = await User.findOne({ username: username });

    if (username.length < 4) {
      return res
        .status(200)
        .json(
          new UnSuccessfulResponse(
            "Please use a username longer than 3 characters"
          )
        );
    }

    if (password.length < 7) {
      return res
        .status(200)
        .json(
          new UnSuccessfulResponse(
            "Please use a password at least 7 characters long"
          )
        );
    }

    if (userAlreadyExists) {
      return res
        .status(200)
        .json(
          new UnSuccessfulResponse(
            "Username already taken! Please pick another one!"
          )
        );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword });
      return res.status(200).json(new SuccessfulResponse(newUser));
    }
  } catch (err) {
    return res.status(500).json(new ErrorResponse(err.message));
    // return next(err);
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
