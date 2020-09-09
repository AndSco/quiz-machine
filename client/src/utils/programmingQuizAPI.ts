import { ProgrammingQuizCategory } from "../models/ProgrammingQuizApi";
import { Difficulty } from "../models/TriviaApi";
import { ProgrammingQuizBaseUrl } from "../constants/urls";

export const getProgrammingQuizApiQuestions = async (
  questionsAmount: number = 5,
  category?: ProgrammingQuizCategory,
  difficulty?: Difficulty
) => {
  const endpoint = `${ProgrammingQuizBaseUrl}${
    category ? "&category=" + category : ""
  }${difficulty ? "&difficulty=" + difficulty : ""}&limit=${questionsAmount}`;

  const questions = await (await fetch(endpoint)).json();

  return questions;
};
