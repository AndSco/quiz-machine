import React from "react";
import styled from "styled-components";
import { breakpoints } from "../../constants/breakpoints";

const RoundLogoContainer = styled.div`
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

const StyledLogin = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #03045e;

  img {
    width: 80px;
    height: 80px;
  }

  h3 {
    color: #caf0f8;
    font-family: sans-serif;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    min-width: 350px;
    margin-top: 1.5em;
  }

  input {
    padding: 1em;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    background-color: #023e8a;
    padding: 1em;
    width: 100%;
    cursor: pointer;
    color: white;
    font-weight: bold;
  }

  .error {
    color: red;
    padding: 1em;
  }

  @media (max-width: ${breakpoints.smallScreens}px) {
    input {
      height: 50px;
    }
  }
`;

export const Login: React.FC = () => {
  return <StyledLogin></StyledLogin>;
};
