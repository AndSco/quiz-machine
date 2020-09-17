import { InputName as AuthInputName } from "../reducers/AuthReducers";
import { InputName as QuizInputName } from "../reducers/QuizCreation";

type AuthInputConfig = {
  name: AuthInputName;
  inputType?: "text" | "password";
};

export const LoginFormInputsValues: AuthInputConfig[] = [
  { name: "username" as AuthInputName },
  { name: "password" as AuthInputName, inputType: "password" }
];

export const RegistrationFormInputsValues: AuthInputConfig[] = [
  { name: "username" as AuthInputName },
  { name: "password" as AuthInputName, inputType: "password" }
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
