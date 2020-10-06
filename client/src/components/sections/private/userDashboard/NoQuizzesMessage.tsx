import React from "react";
import styled from "styled-components";
import { Clickable } from "../../../UI/Clickable";
import { Colors } from "../../../../constants/colors";

const Message = styled.h2`
  border: 2px solid ${Colors.STEEL_PINK};
  color: ${Colors.STEEL_PINK};
  padding: 0.7rem 1.4rem;
  border-radius: 40px;
  max-width: 70vw;
`;

export interface QuizCreator {
  startCreatingQuiz: () => void;
}

export const NoQuizzesMessage: React.FC<QuizCreator> = ({
  startCreatingQuiz
}) => {
  return (
    <>
      <h3 style={{ color: Colors.LIGHTER_GREY }}>No custom quizzes yet...</h3>
      <Clickable onClick={startCreatingQuiz}>
        <Message>CREATE ONE NOW!</Message>
      </Clickable>
    </>
  );
};
