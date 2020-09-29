import React from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f7f5ec;
`;

export const Spinner: React.FC = () => {
  return (
    <Background>
      <div className="spinner"></div>
    </Background>
  );
};
