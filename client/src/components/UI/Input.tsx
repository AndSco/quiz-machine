import React, { useState } from "react";
import styled from "styled-components";
import { InputName as AuthInputName } from "../../reducers/AuthReducers";
import { InputName as QuizInputName } from "../../reducers/QuizCreation";
import { IconForInput } from "./IconForInput";

export const StyledInput = styled.input`
  padding: 1rem;
  background-color: white;
  width: 300px;
  box-sizing: border-box;
  margin: 0.7rem 0 1.5rem 0;
  border: 0;
  position: relative;
  border-radius: 40px;
`;

export const StyledLabel = styled.label`
  font-size: 0.7rem;
  font-weight: 500;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type InputName = AuthInputName | QuizInputName;

interface InputProps {
  inputName: InputName;
  onChangeFunction: (input: string, inputName: any) => void;
  resetError?: () => void;
  inputType?: "text" | "password";
  value: string;
  isRequired?: boolean;
  label: string;
  onBlurFunction?: () => void;
}

export const Input: React.FC<InputProps> = ({
  inputName,
  onChangeFunction,
  resetError,
  inputType,
  value,
  label,
  isRequired = false,
  onBlurFunction
}) => {
  const [typeOfInput, setTypeOfInput] = useState(inputType);

  const revealHidePassword = () =>
    setTypeOfInput(prevType => (prevType === "password" ? "text" : "password"));

  return (
    <Container>
      <StyledLabel htmlFor={inputName}>{label}</StyledLabel>
      <div style={{ display: "flex", alignItems: "center" }}>
        <StyledInput
          type={typeOfInput}
          value={value}
          required={isRequired}
          onClick={resetError}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeFunction(e.target.value, inputName)
          }
          onBlur={onBlurFunction}
          id={inputName}
        />

        {inputType === "password" && value.length > 0 && (
          <IconForInput
            icon={typeOfInput === "password" ? "eye" : "eye-slash"}
            onCLickFunction={revealHidePassword}
            paddingBottom="0.7rem"
          />
        )}
      </div>
    </Container>
  );
};
