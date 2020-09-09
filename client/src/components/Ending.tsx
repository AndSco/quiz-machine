import React from "react";
import styled from "styled-components";
import { StyledButton } from "./QuizChoiceButton";
import { StyledCard } from "./replies/QuestionCard";

const EndingContainer = styled(StyledCard)``;

interface EndingProps {
  score: number;
  totalQuestions: number;
  playAgain: () => void;
}

export const Ending: React.FC<EndingProps> = ({
  score,
  totalQuestions,
  playAgain
}) => {
  return (
    <EndingContainer>
      <h2>
        Your score: {score}/{totalQuestions}
      </h2>
      <StyledButton onClick={playAgain}>Play again</StyledButton>
    </EndingContainer>
  );
};
