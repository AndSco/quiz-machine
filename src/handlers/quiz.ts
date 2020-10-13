import { RequestHandler } from "express";
import { Quiz } from "../models/quiz";
import { User, iUser } from "../models/user";
import { ApiResponse } from "../models/apiResponses";
import { loadQuizToDb } from "../utils/quiz";

export const createQuiz: RequestHandler = async (req, res, next) => {
  try {
    const { quiz, createdBy } = req.body;
    const response = await loadQuizToDb(quiz, createdBy);
    // const newQuiz = await Quiz.create({ ...quiz, createdBy });
    // const quizCreator = await User.findById(createdBy);
    // if (!quizCreator || !newQuiz) {
    //   response = {
    //     message: "Something went wrong",
    //     payload: null,
    //     error: "Something went wrong"
    //   };
    // } else {
    //   (quizCreator as iUser).quizzes!.push(newQuiz);
    //   quizCreator!.save();
    //   response = {
    //     message: "Quiz created",
    //     payload: newQuiz,
    //     error: null
    //   };
    // }

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json("something went wrong");
    return next(err);
  }
};

// export const createQuiz: RequestHandler = async (req, res, next) => {
//   try {
//     let response: ApiResponse;
//     const { quiz, createdBy } = req.body;
//     const newQuiz = await Quiz.create({ ...quiz, createdBy });
//     const quizCreator = await User.findById(createdBy);
//     if (!quizCreator || !newQuiz) {
//       response = {
//         message: "Something went wrong",
//         payload: null,
//         error: "Something went wrong"
//       };
//     } else {
//       (quizCreator as iUser).quizzes!.push(newQuiz);
//       quizCreator!.save();
//       response = {
//         message: "Quiz created",
//         payload: newQuiz,
//         error: null
//       };
//     }

//     res.status(200).json(response);
//   } catch (err) {
//     return next(err);
//   }
// };

export const getAllPublicQuizzes: RequestHandler = async (req, res, next) => {
  try {
    const allQuizzes = await Quiz.find({ isPrivate: false })
      .populate("createdBy", "username")
      .exec();

    const response: ApiResponse = {
      message: "All quizzes",
      error: null,
      payload: allQuizzes
    };

    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};

export const getSingleQuiz: RequestHandler<{ quizId: string }> = async (
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

export const deleteQuiz: RequestHandler<{ quizId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { quizId } = req.params;
    await Quiz.findByIdAndDelete(quizId);
    return res.status(200).json("QUIZ DELETED");
  } catch (err) {
    return next(err);
  }
};

export const editQuiz: RequestHandler<{ quizId: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { quizId } = req.params;
    const { updatedQuiz } = req.body;
    await Quiz.findOneAndUpdate({ _id: quizId }, { ...updatedQuiz });
    return res.status(200).json("QUIZ UPDATED");
  } catch (err) {
    return next(err);
  }
};
