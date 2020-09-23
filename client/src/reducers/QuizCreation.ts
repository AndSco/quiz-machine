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
    // manage delete question
    if (typeof action.payload === "string") {
      const questionToRemove = action.payload;
      const remainingQuestions = state.questions.filter(
        question => question.question !== questionToRemove
      );
      return { ...state, questions: remainingQuestions };
    }
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
  backgroundImageUrl:
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  isPrivate: true,
  questions: []
};
