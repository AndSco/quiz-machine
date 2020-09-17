import React, { useReducer } from "react";
import { Input } from "./UI/Input";
import { ErrorMessage } from "./UI/ErrorMessage";
import { InputName as AuthInputName } from "../reducers/AuthReducers";
import { InputName as QuizInputName } from "../reducers/QuizCreation";
import { FormContainer, FormTitle, SubmitButton } from "./UI/Form";

type PossibleInputName = AuthInputName | QuizInputName;

export type InputConfig = {
  name: PossibleInputName;
  inputType?: "text" | "password";
};

export interface Action {
  type: PossibleInputName;
  payload?: string;
}

type Props = {
  title: string;
  inputs: InputConfig[];
  reducer: React.Reducer<any, any>;
  inputStartingValues: any;
  handleSubmit: (filledInInputs: any[]) => Promise<void>;
  message: string;
  resetMessage: () => void;
};

export const UniversalForm: React.FC<Props> = ({
  title,
  inputs,
  reducer,
  inputStartingValues,
  handleSubmit,
  message,
  resetMessage
}) => {
  const [inputValues, dispatch] = useReducer(reducer, inputStartingValues);

  const handleChange = (input: string, inputName: PossibleInputName) =>
    dispatch({ type: inputName, payload: input });

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(inputValues);
        }}
      >
        {inputs.map(input => (
          <Input
            key={input.name}
            inputType={input.inputType ? input.inputType : "text"}
            inputName={input.name}
            onChangeFunction={handleChange}
            resetError={resetMessage}
          />
        ))}
        {message && <ErrorMessage>{message}</ErrorMessage>}
        <SubmitButton type="submit">SUBMIT</SubmitButton>
      </form>
    </FormContainer>
  );
};
