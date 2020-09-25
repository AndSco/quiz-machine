import {
  TriviaCategory,
  getCategoryId,
  Difficulty,
  TriviaApiResponse
} from "../models/TriviaApi";
import { TriviaBaseUrl } from "../constants/urls";

export const getTriviaApiQuestions = async (
  questionsAmount: number = 5,
  category?: TriviaCategory,
  difficulty?: Difficulty
): Promise<TriviaApiResponse> => {
  const endpoint = `${TriviaBaseUrl}?amount=${questionsAmount}${
    category ? "&category=" + getCategoryId(category) : ""
  }${difficulty ? "&difficulty=" + difficulty : ""}&type=multiple`;

  const { results: questions } = await (await fetch(endpoint)).json();
  // if it fails, returns results: []

  return questions;
};
