import React from "react";
import styled from "styled-components";
import { InputName } from "../../reducers/FormReducers";
import { Colors } from "../../constants/colors";

const StyledInput = styled.input`
  padding: 1rem;
  background-color: white;
  width: 300px;
  box-sizing: border-box;
  margin: 0.6rem 0 1rem 0;
  border: 0;
`;

const StyledLabel = styled.label`
  font-size: 0.8rem;
  color: ${Colors.DARK_BLUE};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface InputProps {
  inputName: InputName;
  onChangeFunction: (input: string, inputName: InputName) => void;
  resetError: () => void;
}

export const Input: React.FC<InputProps> = ({
  inputName,
  onChangeFunction,
  resetError
}) => {
  return (
    <Container>
      <StyledLabel htmlFor={inputName}>{inputName.toUpperCase()}</StyledLabel>
      <StyledInput
        type="text"
        required
        onClick={resetError}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeFunction(e.target.value, inputName)
        }
      />
    </Container>
  );
};
