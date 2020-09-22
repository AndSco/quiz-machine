import { RequestHandler } from "express";
import { Quiz } from "../models/quiz";
import { ApiResponse } from "../models/apiResponses";

export const getUserQuizzes: RequestHandler<{ userId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req.params;
    const userQuizzes = await Quiz.find({ createdBy: userId });
    const response: ApiResponse = {
      message: "User quizzes",
      error: null,
      payload: userQuizzes
    };

    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};
