import React from "react";
import styled from "styled-components";
import { MainTitle } from "../UI/MainTitle";
import { Step } from "../../models/Step";
import { Difficulty } from "../../models/TriviaApi";
import { StepTemplate } from "./StepTemplate";
import { NextButton } from "../UI/NextButton";

const Select = styled.select`
  padding: 0.5rem 1rem;
  width: 30vw;
  font-size: 1rem;
  border: 1px solid #e6e6e6;
`;

interface Props {
  currentLevel: Difficulty;
  changeLevel: (level: Difficulty) => void;
}

export const DifficultyStep: React.FC<Props & Step> = ({
  currentLevel,
  changeLevel,
  goForward
}) => {
  return (
    <StepTemplate>
      <MainTitle>How difficult?</MainTitle>
      <Select
        value={currentLevel}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          changeLevel(e.target.value as Difficulty);
        }}
      >
        {/* <option value="">Choose a difficulty level</option> */}
        <option value="easy">EASY</option>
        <option value="medium">MEDIUM</option>
        <option value="hard">HARD</option>
        <option value="">ANY</option>
      </Select>
      <NextButton onClickFunction={goForward} />
    </StepTemplate>
  );
};
