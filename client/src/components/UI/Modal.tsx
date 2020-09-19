import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { Icon } from "./Icon";

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.DARK_BLUE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const BackIconContainer = styled.div`
  position: fixed;
  /* top: 40px; */
  left: 30px;
  cursor: pointer;
`;

interface Props {
  // children: any;
  handleClose: () => void;
}

export const Modal: React.FC<Props> = ({ children, handleClose }) => {
  return (
    <StyledModal>
      <BackIconContainer onClick={handleClose}>
        <Icon icon={"arrow-circle-left"} color="white" size="3x" />
      </BackIconContainer>
      {children}
    </StyledModal>
  );
};
