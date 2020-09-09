import React from "react";
import styled from "styled-components";
import { MainTitle } from "../UI/MainTitle";
import { Step } from "../../models/Step";
import { StepTemplate } from "./StepTemplate";
import { NextButton } from "../UI/NextButton";

const InputContainer = styled.div``;
const Input = styled.input`
  width: 30vw;
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid #e6e6e6;
  padding: 0.5rem 1rem;
`;

interface Props {
  chooseAmountOfQuestions: (num: number) => void;
  currentAmount: number;
}

export const NumQuestionsStep: React.FC<Props & Step> = ({
  chooseAmountOfQuestions,
  currentAmount,
  goForward
}) => {
  return (
    <StepTemplate>
      <MainTitle>How many questions?</MainTitle>
      <InputContainer>
        <Input
          type="number"
          min={5}
          step={1}
          max={7}
          value={currentAmount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            chooseAmountOfQuestions(+e.target.value);
          }}
        />
        <NextButton onClickFunction={goForward} />
      </InputContainer>
    </StepTemplate>
  );
};
