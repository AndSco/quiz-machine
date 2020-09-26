import React, { createContext, useState, useEffect, useContext } from "react";
import { Question, QuizType, Subject } from "../../models/PublicQuizQuestion";
import { Difficulty } from "../../models/TriviaApi";
import { PrivateQuiz } from "../../models/PrivateQuiz";
import { getCustomUsersQuizzes } from "../../utils/dbFunctions";
import { LoadingContext } from "../../contexts/loading/Loading";

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
  usersCustomQuizzes: PrivateQuiz[];
  getCustomQuizzes: () => void;
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
  uploadQuestions: () => {},
  reset: () => {},
  usersCustomQuizzes: [],
  getCustomQuizzes: () => {}
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
  const [usersCustomQuizzes, setUsersCustomQuizzes] = useState<PrivateQuiz[]>(
    []
  );
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const getCustomQuizzes = async () => {
    startLoading();
    const dbResponse = await getCustomUsersQuizzes();
    const customQuizzes = dbResponse.payload;
    setUsersCustomQuizzes(customQuizzes);
    stopLoading();
  };

  useEffect(() => {
    getCustomQuizzes();
  }, []);

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
    startLoading();
    if (questions.length === 0) {
      throw new Error(
        "Not enough quizzes matching these parameters. Try again!"
      );
    }
    setQuestions(questions);
    setStartedQuiz(true);
    stopLoading();
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
    reset,
    usersCustomQuizzes,
    getCustomQuizzes
  };

  return (
    <QuizzesContext.Provider value={{ ...valuesToPass }}>
      {children}
    </QuizzesContext.Provider>
  );
};
