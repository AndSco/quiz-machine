import { iQuiz, Quiz } from "../models/quiz";
import { User, iUser } from "../models/user";
import { ApiResponse } from "../models/apiResponses";

export const loadQuizToDb = async (quiz: iQuiz, createdBy: string) => {
  const newQuiz = await Quiz.create({ ...quiz, createdBy });
  const quizCreator = await User.findById(createdBy);
  let response: ApiResponse;

  if (!quizCreator || !newQuiz) {
    response = {
      message: "Something went wrong",
      payload: null,
      error: "Something went wrong"
    };
  } else {
    (quizCreator as iUser).quizzes!.push(newQuiz);
    quizCreator!.save();
    response = {
      message: "Quiz created",
      payload: newQuiz,
      error: null
    };
  }

  return response;
};
