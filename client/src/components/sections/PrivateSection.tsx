import React from "react";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { NavbarContainer } from "../Navbar";
import { Logo } from "../Logo";
import { Link } from "react-router-dom";
import { LoginButton } from "../UI/Buttons";
import styled from "styled-components";

const BackButton = styled(LoginButton)`
  width: 160px;
`;

const Navbar: React.FC = () => (
  <NavbarContainer>
    <Link to="/">
      <Logo />
    </Link>
    <Link to="/">
      <BackButton>Back to quizzes</BackButton>
    </Link>
  </NavbarContainer>
);

const Section = styled.div`
  flex: 1;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

export const PrivateSection: React.FC<{
  activity: "registration" | "login";
}> = ({ activity }) => {
  return (
    <Section>
      <Navbar />
      <Main>{activity === "login" ? <Login /> : <Register />}</Main>
    </Section>
  );
};
