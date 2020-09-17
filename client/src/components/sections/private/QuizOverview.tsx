import React from "react";
import styled from "styled-components";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { BigTitle } from "../../UI/Titles";

interface Props {
  myQuizzes: PrivateQuiz[];
}

export const QuizOverview: React.FC<Props> = ({ myQuizzes }) => {
  return (
    <>
      <BigTitle>My quizzes</BigTitle>
      {myQuizzes.map((quiz, index) => (
        <h5 key={index}>Quiz: {quiz.title}</h5>
      ))}
    </>
  );
};
