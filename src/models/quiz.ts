import { Schema, Document, model } from "mongoose";
import { iQuestion } from "./question";

export interface iQuiz extends Document {
  title: string;
  backgroundImageUrl?: string;
  questions: iQuestion[];
  createdBy: string;
  isPrivate: boolean;
}

const quizSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    backgroundImageUrl: {
      type: String,
      required: true
    },
    questions: [
      {
        question: {
          type: String,
          required: true
        },
        code: {
          type: String,
          default: ""
        },
        allReplies: [],
        rightReply: {
          type: String,
          required: true
        },
        explanation: {
          type: String
        }
      }
    ],
    createdBy: {
      type: String
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Quiz = model<iQuiz>("Quiz", quizSchema);
