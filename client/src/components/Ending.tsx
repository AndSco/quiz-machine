import React from "react";
import styled from "styled-components";
import { BaseButton } from "./UI/Buttons";
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
      <BaseButton onClick={playAgain}>Play again</BaseButton>
    </EndingContainer>
  );
};
