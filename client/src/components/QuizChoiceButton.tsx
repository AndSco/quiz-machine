import React from "react";
import styled from "styled-components";
import { Colors } from "../constants/colors";

export const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${Colors.ORANGE};
  color: white;
  color: ${Colors.BLACK};
  color: white;
  border-radius: 40px;
  border: none;
  width: 250px;
  font-weight: bolder;
  font-size: 1.2rem;
  font-family: "Roboto Slab", serif;

  :hover {
    background-color: ${Colors.DARK_BLUE};
  }
`;

interface Props {
  text: string;
  callback: () => void;
}

export const QuizChoiceButton: React.FC<Props> = ({ text, callback }) => {
  return <StyledButton onClick={callback}>{text}</StyledButton>;
};
