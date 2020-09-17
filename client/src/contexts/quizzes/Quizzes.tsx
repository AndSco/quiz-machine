import React, { createContext, useState } from "react";
import { Question, QuizType, Subject } from "../../models/Question";
import { Difficulty } from "../../models/TriviaApi";

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
}

const startingValue: iQuizzesContext = {
  quizType: QuizType.TRIVIA,
  currentSubject: "",
  numberOfQuestions: 5,
  difficultyLevel: "medium",
  quizConfigurationStep: 1,
  questions: [],
  configQuiz: (option: ConfigOption, inputValue: any) => {},
  startedQuiz: false,
  goToNextQuizConfiguration: () => {},
  uploadQuestions: ([]) => {},
  reset: () => {}
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

  const reset = () => {
    setStartedQuiz(false);
    setQuizConfigurationStep(1);
    setNumberOfQuestions(5);
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

  const uploadQuestions = (questions: Question[]) => {
    setQuestions(questions);
    setStartedQuiz(true);
  };

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
    reset
  };

  return (
    <QuizzesContext.Provider value={{ ...valuesToPass }}>
      {children}
    </QuizzesContext.Provider>
  );
};
