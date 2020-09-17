import React, { useContext } from "react";
import styled from "styled-components";
import { MainTitle } from "../UI/Titles";
import { Difficulty } from "../../models/TriviaApi";
import { StepTemplate } from "./StepTemplate";
import { NextButton } from "../UI/NextButton";
import { QuizzesContext } from "../../contexts/quizzes/Quizzes";

const Select = styled.select`
  padding: 0.5rem 1rem;
  width: 30vw;
  font-size: 1rem;
  border: 1px solid #e6e6e6;
`;

interface Props {
  currentLevel: Difficulty;
}

export const DifficultyStep: React.FC<Props> = ({ currentLevel }) => {
  const { configQuiz, goToNextQuizConfiguration } = useContext(QuizzesContext);
  return (
    <StepTemplate>
      <MainTitle>How difficult?</MainTitle>
      <Select
        value={currentLevel}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          configQuiz("difficulty", e.target.value);
        }}
      >
        <option value="easy">EASY</option>
        <option value="medium">MEDIUM</option>
        <option value="hard">HARD</option>
        <option value="">ANY</option>
      </Select>
      <NextButton onClickFunction={goToNextQuizConfiguration} />
    </StepTemplate>
  );
};
