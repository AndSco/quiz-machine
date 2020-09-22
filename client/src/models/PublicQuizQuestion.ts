import { Difficulty, TriviaCategory } from "./TriviaApi";
import { ProgrammingQuizCategory } from "./ProgrammingQuizApi";

export type Subject = TriviaCategory | ProgrammingQuizCategory | "";

interface iQuestion {
  question: string;
  difficulty: Difficulty;
  subject: Subject;
  allReplies: string[];
  rightReply: string;
  explanation?: string;
}

export class Question implements iQuestion {
  constructor(
    public question: string,
    public difficulty: Difficulty,
    public subject: Subject,
    public allReplies: string[],
    public rightReply: string,
    public explanation?: string
  ) {}
}

export enum QuizType {
  TRIVIA = "trivia",
  PROGRAMMING = "programming",
  USERS_QUIZZES = "users"
}

export interface APISendable {
  quizType: QuizType;
  numOfQuestions: number;
  difficulty: Difficulty;
  subject: Subject;
}
