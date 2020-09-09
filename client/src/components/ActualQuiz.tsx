import React, { useState } from "react";
import styled from "styled-components";
import { Question, Subject } from "../models/Question";
import { QuestionCard } from "./replies/QuestionCard";
import { getSubjectBackgroundPic } from "../utils/functions";
import { Ending } from "./Ending";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${(props: { subject: Subject }) =>
    `url("${getSubjectBackgroundPic(props.subject)}")`};
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ActualQuizProps {
  allQuestions: Question[];
  subject: Subject;
  reset: () => void;
}

export const ActualQuiz: React.FC<ActualQuizProps> = ({
  subject,
  allQuestions,
  reset
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const goToNextQuestion = () => setCurrentQuestionIndex(prev => prev + 1);
  const givePoint = () => setScore(prevScore => prevScore + 1);
  const thereAreStillQuestions = () =>
    allQuestions.length >= currentQuestionIndex + 1;

  return (
    <Background subject={subject}>
      {thereAreStillQuestions() ? (
        <QuestionCard
          question={allQuestions[currentQuestionIndex]}
          next={goToNextQuestion}
          numberOfQuestions={allQuestions.length}
          currentNumberOfQuestion={currentQuestionIndex + 1}
          givePoint={givePoint}
        />
      ) : (
        <Ending
          score={score}
          totalQuestions={allQuestions.length}
          playAgain={reset}
        />
      )}
    </Background>
  );
};
