import {
  QuizType,
  Question,
  Subject,
  APISendable
} from "../models/PublicQuizQuestion";
import {
  TriviaResultType,
  Difficulty,
  TriviaCategory
} from "../models/TriviaApi";
import {
  ProgrammingQuizResultType,
  ProgrammingQuizCategory
} from "../models/ProgrammingQuizApi";
import { getTriviaApiQuestions } from "./triviaAPI";
import { getProgrammingQuizApiQuestions } from "./programmingQuizAPI";
import { picsUrls } from "../constants/picsUrls";
import { User } from "../models/User";

type PossibleQuestionFormat = TriviaResultType | ProgrammingQuizResultType;

export const getQuestions = async (configs: APISendable) =>
  configs.quizType === QuizType.TRIVIA
    ? normalizeTrivia(
        await getTriviaApiQuestions(
          configs.numOfQuestions,
          configs.subject as TriviaCategory,
          configs.difficulty
        )
      )
    : normalizeProgramming(
        await getProgrammingQuizApiQuestions(
          configs.numOfQuestions,
          configs.subject as ProgrammingQuizCategory,
          configs.difficulty
        )
      );

export const normalizeQuestions = (quizType: QuizType) => (
  arrayOfQuestions: any[]
) =>
  arrayOfQuestions.map((question: PossibleQuestionFormat) =>
    quizType === "trivia"
      ? formatTrivia(question as TriviaResultType)
      : formatProgrammingQuestion(question as ProgrammingQuizResultType)
  );

const normalizeTrivia = normalizeQuestions(QuizType.TRIVIA);
const normalizeProgramming = normalizeQuestions(QuizType.PROGRAMMING);

export const formatTrivia = (q: TriviaResultType) => {
  return new Question(
    q.question,
    q.difficulty.toLowerCase() as Difficulty,
    q.category as Subject,
    shuffleArray([...q.incorrect_answers, q.correct_answer]),
    q.correct_answer
  );
};

export const formatProgrammingQuestion = (q: ProgrammingQuizResultType) => {
  const allAnswers = customReduce(Object.values(q.answers));
  let rightAnswer: string;
  for (const [key, val] of Object.entries(q.correct_answers)) {
    if (val === "true") {
      const rightAnswerLabel = getReplyLabel(key);
      rightAnswer = q.answers[rightAnswerLabel as any] as string;
    }
  }

  return new Question(
    q.question,
    q.difficulty.toLowerCase() as Difficulty,
    q.category as Subject,
    allAnswers,
    rightAnswer!,
    q.explanation
  );
};

export const shuffleArray = <T>(array: Array<T>): Array<T> =>
  array.sort((a, b) => 0.5 - Math.random());

const getReplyLabel = (label: string) => label.split("_correct")[0];

export const shortenLengthySubjects = (subjName: string) =>
  subjName.indexOf(":") === -1 ? subjName : subjName.split(": ")[1];

export const getPropertyName = <T, U extends keyof T>(
  object: T,
  propertyName: U
): T[U] => {
  return object[propertyName];
};

export const getSubjectBackgroundPic = (subject: any) =>
  getPropertyName(picsUrls, subject);

export const capitaliseInput = (input: string) => {
  const initial = input[0];
  if (initial.match(/[A-Z]/)) {
    return input;
  }
  return initial.toUpperCase() + input.slice(1);
};

export const copyQuizUrlToCipboard = (link: string) => {
  const actualUrl = window.location.href.split("myDashboard")[0] + link;
  if (!navigator || !navigator.clipboard) {
    alert(`Cannot copy automatically. Please copy this: ${actualUrl}`);
  }
  navigator.clipboard.writeText(actualUrl);
};

export const checkMinimumInputLength = (
  input: string,
  minimumLength: number = 1
) => input.length >= minimumLength;

export const cropInput = (input: string, length: number) =>
  input.length <= length ? input : input.slice(0, length) + "...";

export const removeEntryFromArray = <T>(array: Array<T>, entry: T) =>
  array.filter(element => element !== entry);

export const createScoreComment = (
  score: number,
  questionsNumber: number
): string => {
  const percentage = (score / questionsNumber) * 10;
  if (percentage < 6) {
    return "😭 You can do better!";
  } else if (percentage >= 6 && percentage < 7) {
    return "🥺 Not too bad";
  } else if (percentage >= 7 && percentage < 8.5) {
    return "😀 Good!";
  } else if (percentage >= 8.5 && percentage < 9) {
    return "😍 Great!";
  } else {
    return "🥳 Perfect!!";
  }
};

export const extractNumberFromBreakpoint = (breakpoint: string) =>
  +breakpoint.split("px")[0];

export const saveUserInSessionStorage = (user: User) => {
  sessionStorage.setItem("currentUser", JSON.stringify(user));
};

export const getUserFromSessionStorage = () => {
  const userInStorage = sessionStorage.getItem("currentUser");
  if (userInStorage) return JSON.parse(userInStorage);
  return null;
};

export const removeUserFromSessionStorage = () => {
  sessionStorage.removeItem("currentUser");
};

export const modifyObjectProperty = <T, U extends keyof T>(
  startingValue: T
) => (propertyToChange: U) => (newValue: any) => {
  const copy = { ...startingValue };
  copy[propertyToChange] = newValue;
  return copy;
};

export const getValueWhichIsNot = <T>(arr: T[], valueToExclude: T) => {
  return arr.find(entry => entry !== valueToExclude);
};

const customReduce = (mappable: any) =>
  mappable.reduce(<T>(acc: T[], curr: T) => [...acc, curr], []);
