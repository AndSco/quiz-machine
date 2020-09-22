import React, { useState, useEffect } from "react";
import { QuestionCard } from "../../replies/QuestionCard";
import { Ending } from "../../Ending";
import { QuizBackground } from "../../UI/QuizBackground";
import { PrivateQuiz, PrivateQuizQuestion } from "../../../models/PrivateQuiz";
import { getSingleQuiz } from "../../../utils/dbFunctions";
import { shuffleArray } from "../../../utils/functions";

interface ActualPrivateQuizProps {
  quizId: string;
}

export const ActualPrivateQuiz: React.FC<ActualPrivateQuizProps> = ({
  quizId
}) => {
  const [currentQuiz, setCurrentQuiz] = useState<PrivateQuiz | null>(null);
  const [allQuestions, setAllQuestions] = useState<PrivateQuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  console.log("curr quiz", currentQuiz);
  useEffect(() => {
    const loadQuiz = async () => {
      const quiz = (await getSingleQuiz(quizId)) as unknown;
      setCurrentQuiz(quiz as PrivateQuiz);
    };

    loadQuiz();
  }, []);

  useEffect(() => {
    if (currentQuiz) {
      setAllQuestions(currentQuiz.questions);
    }
  }, [currentQuiz]);

  const goToNextQuestion = () => setCurrentQuestionIndex(prev => prev + 1);
  const givePoint = () => setScore(prevScore => prevScore + 1);
  const thereAreStillQuestions = () =>
    allQuestions.length >= currentQuestionIndex + 1;

  return currentQuiz ? (
    <QuizBackground imageUrl={currentQuiz.backgroundImageUrl as string}>
      {thereAreStillQuestions() ? (
        <QuestionCard
          question={allQuestions[currentQuestionIndex]}
          next={goToNextQuestion}
          numberOfQuestions={allQuestions.length}
          currentNumberOfQuestion={currentQuestionIndex + 1}
          givePoint={givePoint}
          quizType="private"
        />
      ) : (
        <Ending
          score={score}
          totalQuestions={allQuestions.length}
          playAgain={() => console.log("What to do?")}
        />
      )}
    </QuizBackground>
  ) : (
    <h1>Loading</h1>
  );
};