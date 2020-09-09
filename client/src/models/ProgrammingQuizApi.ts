import { Difficulty } from "./TriviaApi";

type PossibleReplyType = string | null;

export interface ProgrammingQuizResultType {
  question: string;
  answers: PossibleReplyType[];
  correct_answers: string[];
  explanation: string;
  category: string;
  difficulty: Difficulty;
}

export type ProgrammingQuizResponse = ProgrammingQuizResultType[];

export type ProgrammingQuizCategory =
  | "bash"
  | "linux"
  | "uncategorized"
  | "docker"
  | "sql"
  | "cms"
  | "code"
  | "devops";
