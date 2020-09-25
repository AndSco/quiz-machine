import React, { useState, useEffect } from "react";
import { QuestionCard } from "../../ActualQuizComponents/QuestionCard";
import { Ending } from "../../ActualQuizComponents/Ending";
import { QuizBackground } from "../../ActualQuizComponents/QuizBackground";
import { PrivateQuiz, PrivateQuizQuestion } from "../../../models/PrivateQuiz";
import { getSingleQuiz } from "../../../utils/dbFunctions";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  useEffect(() => {
    const loadQuiz = async () => {
      const quiz = (await getSingleQuiz(quizId)) as unknown;
      setCurrentQuiz(quiz as PrivateQuiz);
    };

    loadQuiz();
  }, [quizId]);

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
    <QuizBackground
      imageUrl={currentQuiz.backgroundImageUrl as string}
      stopPlaying={() => history.push("/")}
    >
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
          playAgain={() => history.push("/")}
        />
      )}
    </QuizBackground>
  ) : null;
};
