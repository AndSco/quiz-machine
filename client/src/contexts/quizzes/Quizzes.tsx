import React, { createContext, useState, useContext } from "react";
import { Question, QuizType, Subject } from "../../models/PublicQuizQuestion";
import { Difficulty } from "../../models/TriviaApi";
import { LoadingContext } from "../../contexts/loading/Loading";
import { getQuestions } from "../../utils/functions";

type ConfigOption = "quizType" | "difficulty" | "numberOfQuestions" | "subject";

interface iQuizzesContext {
  quizType: QuizType;
  currentSubject: Subject;
  numberOfQuestions: number;
  difficultyLevel: Difficulty;
  quizConfigurationStep: number;
  questions: Question[];
  configQuiz: (option: ConfigOption, inputValue: any) => void;
  startedQuiz: boolean;
  goToNextQuizConfiguration: () => void;
  uploadQuestions: (questions: Question[]) => void;
  reset: () => void;
  getPublicQuizQuestions: () => void;
  quizFetchError: null | Error;
}

const startingValue: iQuizzesContext = {
  quizType: QuizType.TRIVIA,
  currentSubject: "",
  numberOfQuestions: 5,
  difficultyLevel: "medium",
  quizConfigurationStep: 1,
  questions: [],
  configQuiz: () => {},
  startedQuiz: false,
  goToNextQuizConfiguration: () => {},
  uploadQuestions: () => {},
  reset: () => {},
  getPublicQuizQuestions: () => {},
  quizFetchError: null
};

export const QuizzesContext = createContext(startingValue);

export const QuizzesContextProvider: React.FC = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizType, setQuizType] = useState<QuizType>(QuizType.TRIVIA);
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [difficultyLevel, setDifficultyLevel] = useState<Difficulty>("medium");
  const [currentSubject, setCurrentSubject] = useState<Subject | "">("");
  const [quizConfigurationStep, setQuizConfigurationStep] = useState(1);
  const [startedQuiz, setStartedQuiz] = useState(false);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [quizFetchError, setQuizFetchError] = useState(null);

  const uploadQuestions = (questions: Question[]) => {
    setQuestions(questions);
    setStartedQuiz(true);
  };

  const getPublicQuizQuestions = async () => {
    try {
      startLoading();
      const questionsToUpload = await getQuestions({
        quizType,
        difficulty: difficultyLevel,
        numOfQuestions: numberOfQuestions,
        subject: currentSubject
      });
      if (questionsToUpload.length === 0) {
        throw new Error(
          "Not enough quizzes matching these parameters. Try again!"
        );
      }
      uploadQuestions(questionsToUpload);
      stopLoading();
    } catch (err) {
      stopLoading();
      setQuizFetchError(err);
    }
  };

  const reset = () => {
    setStartedQuiz(false);
    setQuizConfigurationStep(1);
    setNumberOfQuestions(5);
    setQuizType(QuizType.TRIVIA);
    setDifficultyLevel("medium");
  };

  const configQuiz = (option: ConfigOption, inputValue: any) => {
    if (option === "quizType") {
      reset();
      setQuizType(inputValue);
    }
    if (option === "difficulty") {
      setDifficultyLevel(inputValue);
    }
    if (option === "numberOfQuestions") {
      setNumberOfQuestions(inputValue);
    }
    if (option === "subject") {
      setCurrentSubject(inputValue);
    }
  };

  const goToNextQuizConfiguration = () =>
    setQuizConfigurationStep(prev => prev + 1);

  const valuesToPass: iQuizzesContext = {
    quizType,
    currentSubject,
    difficultyLevel,
    numberOfQuestions,
    questions,
    quizConfigurationStep,
    configQuiz,
    goToNextQuizConfiguration,
    startedQuiz,
    uploadQuestions,
    reset,
    getPublicQuizQuestions,
    quizFetchError
  };

  return (
    <QuizzesContext.Provider value={{ ...valuesToPass }}>
      {children}
    </QuizzesContext.Provider>
  );
};
