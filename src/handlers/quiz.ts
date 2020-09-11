import { RequestHandler } from "express";
import { Quiz } from "../models/quiz";
import { User, iUser } from "../models/user";
import { ApiResponse } from "../models/apiResponses";

export const createQuiz: RequestHandler = async (req, res, next) => {
  try {
    const { quiz, createdBy } = req.body;
    const newQuiz = await Quiz.create({ ...quiz, createdBy });
    const quizCreator = await User.findById(createdBy);
    if (!quizCreator) {
      console.log("USER NOT FOUND");
      return;
    }
    (quizCreator as iUser).quizzes!.push(newQuiz);
    quizCreator!.save();
    const response: ApiResponse = {
      message: "Quiz created",
      payload: newQuiz,
      error: null
    };
    res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};

export const getQuiz: RequestHandler<{ quizId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    return res.status(200).json(quiz);
  } catch (err) {
    return next(err);
  }
};
