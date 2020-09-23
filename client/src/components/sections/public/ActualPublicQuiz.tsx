import React, { useState } from "react";
import { Question, Subject } from "../../../models/PublicQuizQuestion";
import { QuestionCard } from "../../replies/QuestionCard";
import { getSubjectBackgroundPic } from "../../../utils/functions";
import { Ending } from "../../Ending";
import { QuizBackground } from "../../UI/QuizBackground";

interface ActualQuizProps {
  allQuestions: Question[];
  subject: Subject;
  reset: () => void;
}

export const ActualPublicQuiz: React.FC<ActualQuizProps> = ({
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
    <QuizBackground
      imageUrl={getSubjectBackgroundPic(subject)}
      stopPlaying={reset}
    >
      {thereAreStillQuestions() ? (
        <QuestionCard
          question={allQuestions[currentQuestionIndex]}
          next={goToNextQuestion}
          numberOfQuestions={allQuestions.length}
          currentNumberOfQuestion={currentQuestionIndex + 1}
          givePoint={givePoint}
          quizType="public"
        />
      ) : (
        <Ending
          score={score}
          totalQuestions={allQuestions.length}
          playAgain={reset}
        />
      )}
    </QuizBackground>
  );
};
