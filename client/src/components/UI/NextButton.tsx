import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { Icon } from "./Icon";

const StyledNextButton = styled.button`
  font-size: 1.2rem;
  color: ${Colors.YELLOW};
  font-weight: 500;
  border: none;
  background: none;
  margin-left: 1rem;
  display: inline-flex;
  align-items: center;

  :hover {
    color: ${Colors.ORANGE};
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
