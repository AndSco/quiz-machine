import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${Colors.DIRT_WHITE};
`;

export const Spinner: React.FC = () => {
  return (
    <Background>
      <div className="spinner"></div>
    </Background>
  );
};
