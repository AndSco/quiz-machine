import { InputName as AuthInputName } from "../reducers/AuthReducers";
import { InputName as QuizInputName } from "../reducers/QuizCreation";

export type AuthInputConfig = {
  name: AuthInputName;
  inputType?: "text" | "password";
  label?: string;
};

export const LoginFormInputsValues: AuthInputConfig[] = [
  { name: "username" as AuthInputName, label: "USERNAME" },
  {
    name: "password" as AuthInputName,
    inputType: "password",
    label: "PASSWORD"
  }
];

export const RegistrationFormInputsValues: AuthInputConfig[] = [
  {
    name: "username" as AuthInputName,
    label: "USERNAME (at least 4 characters)"
  },
  {
    name: "password" as AuthInputName,
    inputType: "password",
    label: "PASSWORD (at least 7 characters)"
  },
  {
    name: "passwordConfirmation" as AuthInputName,
    inputType: "password",
    label: "CONFIRM YOUR PASSWORD"
  }
];

type QuizInputConfig = {
  name: QuizInputName;
  inputType?: "text" | "password";
};

export const QuizCreationFormInputsValues: QuizInputConfig[] = [
  { name: "title" as QuizInputName },
  { name: "background image" as QuizInputName },
  { name: "Private?" as QuizInputName },
  { name: "questions" as QuizInputName }
];
