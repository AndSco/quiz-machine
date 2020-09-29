export interface iQuestion {
  question: string;
  code?: string;
  allReplies: string[];
  rightReply: string;
}

type CreatedBy = {
  id: string;
  username: string;
};

export interface PrivateQuiz {
  title: string;
  backgroundImageUrl?: string;
  questions: PrivateQuizQuestion[];
  isPrivate: boolean;
  _id?: string;
  createdBy?: CreatedBy;
}

export class PrivateQuizQuestion implements iQuestion {
  constructor(
    public question: string,
    public allReplies: string[],
    public rightReply: string,
    public code?: string
  ) {}
}

export type PrivacyChoice = "yes" | "no";
