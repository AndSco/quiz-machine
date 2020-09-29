import React from "react";
import styled from "styled-components";
import { BaseButton } from "../UI/Buttons";
import { StyledCard } from "./StyledComponents";
import { createScoreComment } from "../../utils/functions";

const EndingContainer = styled(StyledCard)`
  max-width: 70vw;
`;

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
  const scoreComment = createScoreComment(score, totalQuestions);

  return (
    <EndingContainer>
      <h2>
        Your score: {score}/{totalQuestions}
      </h2>
      <p>{scoreComment}</p>
      <BaseButton onClick={playAgain}>Play again</BaseButton>
    </EndingContainer>
  );
};
