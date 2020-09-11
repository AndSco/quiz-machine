import React from "react";
import styled from "styled-components";
import { Colors } from "../constants/colors";

const StyledLogo = styled.h1`
  font-family: "Fredoka One", cursive;
  color: ${Colors.BLACK};
  font-size: 1.5rem;
  cursor: pointer;

  span {
    color: lightgrey;
  }
`;

export const Logo: React.FC<{ reset?: () => void }> = ({ reset }) => (
  <StyledLogo onClick={reset}>
    Quiz<span>Machine</span>
  </StyledLogo>
);
