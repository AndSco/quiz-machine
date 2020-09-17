import { PrivateQuiz } from "./PrivateQuiz";

export interface User {
  username: string;
  quizzes?: PrivateQuiz[];
  _id: string;
}
