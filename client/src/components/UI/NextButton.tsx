import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { Icon } from "./Icon";

const StyledNextButton = styled.button`
  font-size: 1.2rem;
  font-weight: 500;
  margin-left: 1rem;
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  border-radius: 40px;
  background-color: ${Colors.BLACK};
  color: white;

  :hover {
    background-color: white;
    color: ${Colors.BLACK};
  }
`;

interface Props {
  onClickFunction: () => void;
}

export const NextButton: React.FC<Props> = ({ onClickFunction }) => {
  return (
    <StyledNextButton onClick={onClickFunction}>
      Next
      <Icon icon={"chevron-right"} />
    </StyledNextButton>
  );
};
