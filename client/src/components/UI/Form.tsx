import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { Input } from "./Input";
import { FormReducers, InputName } from "../../reducers/FormReducers";
import { MediumButton } from "./Buttons";
import { loginUser, registerUser } from "../../utils/dbFunctions";
import { AuthScope } from "../../models/AuthScope";
import { ApiResponse } from "../../models/ApiResponse";

const FormContainer = styled.div`
  width: 600px;
  height: 300px;
  background-color: ${Colors.YELLOW};
  color: ${Colors.BLACK};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const FormTitle = styled.h4`
  color: white;
  text-transform: uppercase;
`;

const SubmitButton = styled(MediumButton)`
  position: absolute;
  left: ${300 - 125}px;
  bottom: -25px;
`;

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: red;
  margin-top: 0;
`;

type InputConfig = {
  name: InputName;
};

type Props = {
  title: string;
  inputs: InputConfig[];
  scope: AuthScope;
};

export const Form: React.FC<Props> = ({ title, inputs, scope }) => {
  const [error, setError] = useState("");

  const relevantReducer =
    scope === "login"
      ? FormReducers.login.reducer
      : FormReducers.register.reducer;

  const relevantStartingValues =
    scope === "login"
      ? FormReducers.login.startingValues
      : FormReducers.register.startingValues;

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
    } else {
      response = await registerUser(inputValues);
      console.log("RESSSS", response);
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
            key={input.name}
            inputName={input.name}
            onChangeFunction={handleChange}
            resetError={resetError}
          />
        ))}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">SUBMIT</SubmitButton>
      </form>
    </FormContainer>
  );
};
