import React, { useReducer, useState, useContext } from "react";
import styled from "styled-components";
import { Input } from "../UI/Input";
import { AuthReducers, InputName } from "../../reducers/AuthReducers";
import { loginUser, registerUser } from "../../utils/dbFunctions";
import { getPropertyName } from "../../utils/functions";
import { AuthScope } from "../../models/AuthScope";
import { ApiResponse } from "../../models/ApiResponse";
import { AuthContext } from "../../contexts/auth/Auth";
import { FormContainer, FormTitle, SubmitButton } from "../UI/Form";

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: red;
  margin-top: 0;
`;

export type InputConfig = {
  name: InputName;
  inputType?: "text" | "password";
};

type Props = {
  title: string;
  inputs: InputConfig[];
  scope: AuthScope;
};

export const Form: React.FC<Props> = ({ title, inputs, scope }) => {
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

  const handleSubmit = async () => {
    let response: ApiResponse;
    if (scope === "login") {
      response = await loginUser(inputValues);
      console.log("RESSSS", response);
      loadCurrentUser(response.payload);
    } else {
      response = await registerUser(inputValues);
      console.log("RESSSS", response);
      loadCurrentUser(response.payload);
    }
    if (response.message) {
      setError(response.message);
    }
  };

  const resetError = () => setError("");

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {inputs.map(input => (
          <Input
            label={input.name}
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
        <SubmitButton type="submit">SUBMIT</SubmitButton>
      </form>
    </FormContainer>
  );
};
