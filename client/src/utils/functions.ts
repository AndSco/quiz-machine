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

type PossibleQuestionFormat = TriviaResultType | ProgrammingQuizResultType;

export const getQuestions = async (configs: APISendable) => {
  console.log("config obj", configs);
  let questions;
  if (configs.quizType === QuizType.TRIVIA) {
    questions = await getTriviaApiQuestions(
      configs.numOfQuestions,
      configs.subject as TriviaCategory,
      configs.difficulty
    );
  } else {
    questions = await getProgrammingQuizApiQuestions(
      configs.numOfQuestions,
      configs.subject as ProgrammingQuizCategory,
      configs.difficulty
    );
  }

  const formattedQuestions = normalizeQuestions(configs.quizType, questions);
  return formattedQuestions;
};

export const normalizeQuestions = (
  quizType: QuizType,
  arrayOfQuestions: any[]
) => {
  return arrayOfQuestions.map((question: PossibleQuestionFormat) => {
    if (quizType === "trivia") {
      return formatTrivia(question as TriviaResultType);
    } else {
      return formatProgrammingQuestion(question as ProgrammingQuizResultType);
    }
  });
};

const formatTrivia = (q: TriviaResultType) => {
  return new Question(
    q.question,
    q.difficulty.toLowerCase() as Difficulty,
    q.category as Subject,
    shuffleArray([...q.incorrect_answers, q.correct_answer]),
    q.correct_answer
  );
};

const formatProgrammingQuestion = (q: ProgrammingQuizResultType) => {
  let allAnswers: string[] = [];
  for (const val of Object.values(q.answers)) {
    allAnswers.push(val as string);
  }
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

// export const shuffleArray = (array: any[]) =>
//   array.sort((a, b) => 0.5 - Math.random());

export function shuffleArray<T>(array: Array<T>): Array<T> {
  return array.sort((a, b) => 0.5 - Math.random());
}

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
  return initial.toUpperCase() + input.slice(1);
};
