import { Schema, Document, model } from "mongoose";
import { iQuiz } from "./quiz";

export interface iUser extends Document {
  username: string;
  password: string;
  quizzes?: iQuiz[];
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ]
});

export const User = model<iUser>("User", userSchema);
