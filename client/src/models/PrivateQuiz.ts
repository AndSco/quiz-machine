export interface iQuestion {
  question: string;
  allReplies: string[];
  rightReply: string;
}

export interface PrivateQuiz {
  title: string;
  backgroundImageUrl?: string;
  questions: PrivateQuizQuestion[];
  isPrivate: boolean;
  _id?: string;
}

export class PrivateQuizQuestion implements iQuestion {
  constructor(
    public question: string,
    public allReplies: string[],
    public rightReply: string
  ) {}
}

export type PrivacyChoice = "yes" | "no";
