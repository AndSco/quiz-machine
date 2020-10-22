import React from "react";
import {
  StyledInput,
  Container as InputContainer,
  StyledLabel
} from "../../../../UI/Input";
import { IconForInput } from "../../../../UI/IconForInput";

export const CustomInput: React.FC<{
  label: string;
  handleChangeFunction: any;
  value: string;
  isTextArea?: boolean;
  needsProgress?: boolean;
  onProgressHandler?: any;
}> = ({
  label,
  handleChangeFunction,
  value,
  needsProgress,
  onProgressHandler,
  isTextArea = false
}) => {
  return (
    <InputContainer>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      {!isTextArea ? (
        <StyledInput
          type="text"
          onChange={handleChangeFunction}
          value={value}
          id={label}
        />
      ) : (
        <StyledInput
          as={"textarea"}
          value={value}
          onChange={handleChangeFunction}
          id={label}
        />
      )}
      {needsProgress && value.length > 0 && (
        <IconForInput icon="plus-square" onCLickFunction={onProgressHandler} />
      )}
    </InputContainer>
  );
};
