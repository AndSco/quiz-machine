import React from "react";
import {
  StyledInput,
  Container as InputContainer,
  StyledLabel
} from "../../../../UI/Input";

export const CustomInput: React.FC<{
  label: string;
  handleChangeFunction: any;
  value: string;
  isTextArea?: boolean;
}> = ({ label, handleChangeFunction, value, isTextArea = false }) => {
  return (
    <InputContainer>
      <StyledLabel>{label}</StyledLabel>
      {!isTextArea ? (
        <StyledInput
          type="text"
          onChange={handleChangeFunction}
          value={value}
        />
      ) : (
        <StyledInput
          as={"textarea"}
          value={value}
          onChange={handleChangeFunction}
        />
      )}
    </InputContainer>
  );
};
