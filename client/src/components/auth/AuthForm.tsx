import React, { useReducer, useState, useContext } from "react";
import styled from "styled-components";
import { Input } from "../UI/Input";
import { AuthReducers, InputName } from "../../reducers/AuthReducers";
import { getPropertyName } from "../../utils/functions";
import { AuthScope } from "../../models/AuthScope";
import { AuthContext } from "../../contexts/auth/Auth";
import { FormContainer, FormTitle, SubmitButton } from "../UI/Form";
import { AuthInputConfig } from "../../constants/formInputsValues";
import { Colors } from "../../constants/colors";
import {
  RegistrationFormInputs,
  LoginFormInputs
} from "../../reducers/AuthReducers";
import { AuthResponse } from "./SubmitFunction";

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: red;
  margin-top: 0;
`;

type Props = {
  title: string;
  inputs: AuthInputConfig[];
  scope: AuthScope;
  onSubmit: (
    scope: AuthScope,
    inputValues: LoginFormInputs | RegistrationFormInputs
  ) => Promise<AuthResponse>;
};

export const Form: React.FC<Props> = ({ title, inputs, scope, onSubmit }) => {
  const [error, setError] = useState("");
  const { loadCurrentUser } = useContext(AuthContext);

  const relevantReducer =
    scope === "login"
      ? AuthReducers.login.reducer
      : AuthReducers.register.reducer;

  const relevantStartingValues =
    scope === "login"
      ? AuthReducers.login.startingValues
      : AuthReducers.register.startingValues;

  const [inputValues, dispatch] = useReducer(
    relevantReducer,
    relevantStartingValues
  );

  const handleChange = (input: string, inputName: InputName) =>
    dispatch({ type: inputName, payload: input });

  const resetError = () => setError("");

  return (
    <FormContainer
      background={scope === "register" ? Colors.BLACK : Colors.YELLOW}
      color={scope === "register" ? "#e4e0e0" : Colors.BLACK}
    >
      <FormTitle>{title}</FormTitle>
      <form
        onSubmit={async e => {
          e.preventDefault();
          const response = await onSubmit(scope, inputValues);
          if (response.status === "success") loadCurrentUser(response.payload);
          if (response.status === "failure") {
            const error = response.error || response.message;
            setError(error);
          }
        }}
      >
        {inputs.map(input => (
          <Input
            label={input.label ? input.label : input.name}
            key={input.name}
            inputType={input.inputType ? input.inputType : "text"}
            inputName={input.name}
            onChangeFunction={handleChange}
            resetError={resetError}
            value={getPropertyName(
              inputValues,
              input.name as "password" | "username"
            )}
            isRequired={true}
          />
        ))}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">
          {scope === "register" ? "JOIN" : "ENTER"}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};
