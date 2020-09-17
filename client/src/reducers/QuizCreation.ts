import React from "react";
import { PrivateQuiz, PrivateQuizQuestion } from "../models/PrivateQuiz";

export type InputName =
  | "title"
  | "backgroundImageUrl"
  | "questions"
  | "isPrivate";

export interface QuizCreationAction {
  type: InputName;
  payload?: string | boolean | PrivateQuizQuestion[] | PrivateQuizQuestion;
}

// QUIZ CREATION
export interface QuizCreationFormInputs extends PrivateQuiz {}

export const QuizCreationReducer: React.Reducer<
  QuizCreationFormInputs,
  QuizCreationAction
> = (
  state: QuizCreationFormInputs,
  action: QuizCreationAction
): QuizCreationFormInputs => {
  if (action.type === "questions") {
    return {
      ...state,
      questions: [...state.questions, action.payload as PrivateQuizQuestion]
    };
  }

  const newState = {
    ...state,
    [action.type]: action.payload
  };
  return newState;
};

export const QuizCreationStartingValues: QuizCreationFormInputs = {
  title: "",
  backgroundImageUrl: "",
  isPrivate: true,
  questions: []
};
