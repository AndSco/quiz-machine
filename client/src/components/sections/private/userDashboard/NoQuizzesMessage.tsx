import React from "react";
import styled from "styled-components";
import { Clickable } from "../../../UI/Clickable";
import { Colors } from "../../../../constants/colors";

const Message = styled.h2`
  border: 2px solid ${Colors.STEEL_PINK};
  color: ${Colors.STEEL_PINK};
  padding: 0.7rem 1.4rem;
  border-radius: 40px;
`;

export interface QuizCreator {
  startCreatingQuiz: () => void;
}

export const NoQuizzesMessage: React.FC<QuizCreator> = ({
  startCreatingQuiz
}) => {
  return (
    <Clickable onClick={startCreatingQuiz}>
      <Message>
        No personal quizzes yet. Click here to start creating one!
      </Message>
    </Clickable>
  );
};
