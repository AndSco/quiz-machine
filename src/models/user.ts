import { Schema, Document, model } from "mongoose";
import { iQuiz } from "./quiz";
import passportLocalMongoose from "passport-local-mongoose";

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

// userSchema.plugin(passportLocalMongoose);

export const User = model<iUser>("User", userSchema);
