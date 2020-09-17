import React, { useContext } from "react";
import styled from "styled-components";
import { MainTitle } from "../UI/Titles";
import { StepTemplate } from "./StepTemplate";
import { NextButton } from "../UI/NextButton";
import { QuizzesContext } from "../../contexts/quizzes/Quizzes";

const InputContainer = styled.div``;
const Input = styled.input`
  width: 30vw;
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid #e6e6e6;
  padding: 0.5rem 1rem;
`;

interface Props {
  currentAmount: number;
}

export const NumQuestionsStep: React.FC<Props> = ({ currentAmount }) => {
  const { configQuiz, goToNextQuizConfiguration } = useContext(QuizzesContext);
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
            configQuiz("numberOfQuestions", +e.target.value);
          }}
        />
        <NextButton onClickFunction={goToNextQuizConfiguration} />
      </InputContainer>
    </StepTemplate>
  );
};
