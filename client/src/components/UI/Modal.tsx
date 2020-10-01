import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { Icon } from "./Icon";
import { breakpoints } from "../../constants/breakpoints";

export const StyledModal = styled.div`
  position: absolute;
  padding: 2rem 0 3rem 0;
  top: 0;
  width: 100vw;
  min-height: 100vh;
  /* background-color: ${Colors.DARK_BLUE}; */
  background-color: ${Colors.DIRT_WHITE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 130;
  overflow: scroll;

  @media (max-width: ${breakpoints.smallestScreens}) {
    background-color: ${Colors.YELLOW};
  }
`;

const BackIconContainer = styled.div`
  position: fixed;
  right: 30px;
  top: 30px;
  cursor: pointer;
  z-index: 9;
  background-color: white;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  @media (max-width: ${breakpoints.smallScreens}) {
    top: 20px;
  }
`;

interface Props {
  handleClose: () => void;
}

export const Modal: React.FC<Props> = ({ children, handleClose }) => {
  return (
    <StyledModal>
      <BackIconContainer onClick={handleClose}>
        <Icon icon={"times-circle"} color={Colors.STEEL_PINK_2} size="2x" />
      </BackIconContainer>
      {children}
    </StyledModal>
  );
};
