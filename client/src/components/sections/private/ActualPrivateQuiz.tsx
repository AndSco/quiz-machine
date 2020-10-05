import React, { useState, useEffect } from "react";
import { QuestionCard } from "../../ActualQuizComponents/QuestionCard";
import { Ending } from "../../ActualQuizComponents/Ending";
import { QuizBackground } from "../../ActualQuizComponents/QuizBackground";
import { PrivateQuiz, PrivateQuizQuestion } from "../../../models/PrivateQuiz";
import { getSingleQuiz } from "../../../utils/dbFunctions";
import { useHistory } from "react-router-dom";
import { shuffleArray } from "../../../utils/functions";

interface ActualPrivateQuizProps {
  quizId: string;
}

interface iInitialQuizState {
  isLoading: boolean;
  isError: boolean;
  currentQuiz: null | PrivateQuiz;
  allQuestions: PrivateQuizQuestion[];
}

export const ActualPrivateQuiz: React.FC<ActualPrivateQuizProps> = ({
  quizId
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const history = useHistory();

  const initialState: iInitialQuizState = {
    isLoading: false,
    isError: false,
    currentQuiz: null,
    allQuestions: []
  };

  const [quizState, setQuizState] = useState(initialState);

  useEffect(() => {
    let isMounted = true;

    const loadQuiz = async () => {
      try {
        setQuizState(prevState => ({ ...prevState, isLoading: true }));
        const quiz = (await getSingleQuiz(quizId)) as unknown;
        const mixedQuestions = shuffleArray((quiz as PrivateQuiz).questions);
        mixedQuestions.forEach(
          q => (q.allReplies = shuffleArray(q.allReplies))
        );

        if (isMounted) {
          setQuizState(prevState => {
            return {
              ...prevState,
              isLoading: false,
              currentQuiz: quiz as PrivateQuiz,
              allQuestions: mixedQuestions
            };
          });
        }
      } catch (err) {
        if (isMounted) {
          setQuizState(prevState => {
            return { ...prevState, isLoading: false, isError: true };
          });
        }
        console.error(err);
      }
    };

    loadQuiz();

    return () => {
      isMounted = false;
    };
  }, [quizId]);

  const goToNextQuestion = () => setCurrentQuestionIndex(prev => prev + 1);
  const givePoint = () => setScore(prevScore => prevScore + 1);
  const thereAreStillQuestions = () =>
    quizState.allQuestions.length >= currentQuestionIndex + 1;

  return quizState.currentQuiz ? (
    <QuizBackground
      imageUrl={quizState.currentQuiz.backgroundImageUrl as string}
      stopPlaying={() => history.push("/")}
    >
      {thereAreStillQuestions() ? (
        <QuestionCard
          question={quizState.allQuestions[currentQuestionIndex]}
          next={goToNextQuestion}
          numberOfQuestions={quizState.allQuestions.length}
          currentNumberOfQuestion={currentQuestionIndex + 1}
          givePoint={givePoint}
          quizType="private"
        />
      ) : (
        <Ending
          score={score}
          totalQuestions={quizState.allQuestions.length}
          playAgain={() => history.push("/")}
        />
      )}
    </QuizBackground>
  ) : null;
};
