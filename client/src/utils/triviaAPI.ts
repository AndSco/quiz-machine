import {
  TriviaCategory,
  getCategoryId,
  Difficulty,
  TriviaApiResponse
} from "../models/TriviaApi";
import { TriviaBaseUrl } from "../constants/urls";
import ApiRequest from "./ApiRequest";

export const getTriviaApiQuestions = async (
  questionsAmount: number = 5,
  category?: TriviaCategory,
  difficulty?: Difficulty
): Promise<TriviaApiResponse> => {
  const endpoint = `${TriviaBaseUrl}?amount=${questionsAmount}${
    category ? "&category=" + getCategoryId(category) : ""
  }${difficulty ? "&difficulty=" + difficulty : ""}&type=multiple`;

  const questions = await ApiRequest(endpoint, "trivia");
  // if it fails, returns results: []

  return questions;
};
