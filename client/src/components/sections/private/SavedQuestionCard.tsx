import React from "react";
import styled from "styled-components";
import { PrivateQuizQuestion } from "../../../models/PrivateQuiz";
import { Icon } from "../../UI/Icon";
import { Clickable } from "../../UI/Clickable";
import { Colors } from "../../../constants/colors";

const StyledQuestionCard = styled.div`
  border-radius: 10px;
  padding: 0.2rem 0.6rem;
  text-align: left;
  background-color: ${Colors.ORANGE};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface Props {
  question: PrivateQuizQuestion;
  removeQuestion: (questionText: string) => void;
}

export const SavedQuestionCard: React.FC<Props> = ({
  question,
  removeQuestion
}) => {
  return (
    <StyledQuestionCard>
      <h4>
        <Icon icon={"question-circle"} />
        Q: {question.question}
      </h4>
      <Clickable onClick={() => removeQuestion(question.question)}>
        <Icon icon={"trash-alt"} color="white" />
      </Clickable>
    </StyledQuestionCard>
  );
};
