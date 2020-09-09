import React from "react";
import styled from "styled-components";
import { QuizChoiceButton } from "../QuizChoiceButton";
import { QuizType } from "../../models/Question";
import { MainTitle } from "../UI/MainTitle";
import { Step } from "../../models/Step";

const ButtonContainer = styled.div`
  width: 45vw;
  display: flex;
  justify-content: space-between;
`;

interface Props {
  chooseQuiz: (quizType: QuizType) => void;
}

export const FirstStep: React.FC<Props & Step> = ({
  chooseQuiz,
  goForward
}) => {
  return (
    <>
      <MainTitle>1. Choose your quiz</MainTitle>
      <ButtonContainer>
        <QuizChoiceButton
          text="TRIVIA"
          callback={() => {
            chooseQuiz(QuizType.TRIVIA);
            goForward();
          }}
        />
        <QuizChoiceButton
          text="PROGRAMMING"
          callback={() => {
            chooseQuiz(QuizType.PROGRAMMING);
            goForward();
          }}
        />
      </ButtonContainer>
    </>
  );
};
