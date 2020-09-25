import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { Icon } from "../UI/Icon";

const StyledLogo = styled.h1`
  font-family: "Fredoka One", cursive;
  color: ${Colors.BLACK};
  font-size: 1.5rem;
  cursor: pointer;
  width: 250px;

  span {
    color: lightgrey;
  }
`;

export const Logo: React.FC<{ reset?: () => void }> = ({ reset }) => (
  <StyledLogo onClick={reset}>
    <Icon icon={"brain"} color="lightgrey" sideMargin="3px" />
    Quiz<span>Machine</span>
  </StyledLogo>
);
