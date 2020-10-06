import React from "react";
import styled from "styled-components";
import { PrivateQuiz } from "../../../../models/PrivateQuiz";
import { GridWrapper } from "../../../UI/GridWrapper";
import { MyQuizCard } from ".././MyQuizCard";
import { QuizCreator } from "./NoQuizzesMessage";
import { ControlButton } from "./ControlButton";

const Controls = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
`;

const Wrapper = styled(GridWrapper)`
  flex-wrap: nowrap;
  flex-direction: column;
`;

interface Props {
  myQuizzes: PrivateQuiz[];
  startEditingQuiz: (quiz: PrivateQuiz) => void;
}

export const MyQuizzesList: React.FC<Props & QuizCreator> = ({
  myQuizzes,
  startCreatingQuiz,
  startEditingQuiz
}) => {
  return (
    <>
      <Controls>
        <ControlButton isSelected={true} text="Your quizzes" />
        <ControlButton
          isSelected={false}
          text="Create a new quiz"
          onClickHandler={startCreatingQuiz}
        />
      </Controls>

      <Wrapper>
        {myQuizzes.map((quiz, index) => (
          <MyQuizCard quiz={quiz} key={index} editQuiz={startEditingQuiz} />
        ))}
      </Wrapper>
    </>
  );
};
