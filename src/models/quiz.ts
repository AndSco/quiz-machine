import { Schema, Document, model } from "mongoose";
import { iQuestion } from "./question";

export interface iQuiz extends Document {
  title: string;
  backgroundImageUrl?: string;
  questions: iQuestion[];
  createdBy: string;
}

const quizSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    backgroundImageUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    questions: [],
    createdBy: {
      type: String
    }
  },
  { timestamps: true }
);

export const Quiz = model<iQuiz>("Quiz", quizSchema);
