import React from "react";
import styled from "styled-components";
import { PrivateQuizQuestion } from "../../../models/PrivateQuiz";
import { Icon } from "../../UI/Icon";

const StyledQuestionCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 0.2rem;
`;

export const SavedQuestionCard: React.FC<{
  question: PrivateQuizQuestion;
}> = ({ question }) => {
  return (
    <StyledQuestionCard>
      <h4>
        <Icon icon={"question-circle"} />
        Q: {question.question}
      </h4>
    </StyledQuestionCard>
  );
};
