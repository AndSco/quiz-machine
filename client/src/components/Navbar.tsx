import React, { useContext } from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { Colors } from "../constants/colors";
import { QuizType } from "../models/Question";
import { Link } from "react-router-dom";
import { LoginButton, RegisterButton } from "./UI/Buttons";
import { AuthContext } from "../contexts/auth/Auth";
import { QuizzesContext } from "../contexts/quizzes/Quizzes";

export const NavbarContainer = styled.div`
  max-width: 100vw;
  display: flex;
  height: 70px;
  -webkit-box-shadow: 0px 0px 3px -1px rgba(87, 84, 87, 1);
  -moz-box-shadow: 0px 0px 3px -1px rgba(87, 84, 87, 1);
  box-shadow: 0px 0px 3px -1px rgba(87, 84, 87, 1);
  padding: 0 2.5rem 0 1.5rem;
  align-items: center;
  justify-content: space-between;
`;

const MenuItems = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  font-family: "Fredoka One", cursive;
  cursor: pointer;
  font-size: 0.9rem;
`;

const MenuItemsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: ${(props: { flex: number }) => props.flex};
`;

const MenuItem = styled.li`
  color: ${(props: { value: QuizType; selectedNow: QuizType }) =>
    props.selectedNow === props.value ? Colors.BLACK : Colors.LIGHTER_GREY};
  border-bottom: ${(props: { value: QuizType; selectedNow: QuizType }) =>
    props.selectedNow === props.value
      ? "4px solid #ffcf10"
      : "4px solid white"};

  padding: 0 1.5rem 4px 1.5rem;
  margin: 0 1rem;

  :hover {
    border-bottom: ${(props: { value: QuizType; selectedNow: QuizType }) =>
      props.selectedNow === props.value
        ? "4px solid #ffcf10"
        : "4px solid #b9b5b5"};
  }
`;

const BackButton = styled(LoginButton)`
  width: 160px;
`;

const AuthButtons: React.FC = () => {
  return (
    <MenuItemsContainer flex={1}>
      <Link to="/login">
        <LoginButton>Login</LoginButton>
      </Link>
      <Link to="/register">
        <RegisterButton>Register</RegisterButton>
      </Link>
    </MenuItemsContainer>
  );
};

export const Navbar: React.FC = () => {
  const { quizType, configQuiz, reset } = useContext(QuizzesContext);
  const { currentUser, isInPrivateSection } = useContext(AuthContext);

  return (
    <NavbarContainer>
      <Link to="">
        <Logo reset={reset} />
      </Link>
      {!isInPrivateSection && (
        <MenuItems>
          <MenuItemsContainer flex={2}>
            <MenuItem
              value={QuizType.TRIVIA}
              selectedNow={quizType}
              onClick={() => configQuiz("quizType", QuizType.TRIVIA)}
            >
              TRIVIA QUIZ
            </MenuItem>
            <MenuItem
              value={QuizType.PROGRAMMING}
              selectedNow={quizType}
              onClick={() => configQuiz("quizType", QuizType.PROGRAMMING)}
            >
              PROGRAMMING QUIZ
            </MenuItem>
          </MenuItemsContainer>
        </MenuItems>
      )}

      {!isInPrivateSection && !currentUser ? (
        <AuthButtons />
      ) : isInPrivateSection ? (
        <Link to="/">
          <BackButton>Back to quizzes</BackButton>
        </Link>
      ) : (
        <Link to="/myDashboard">
          <BackButton>My dashboard</BackButton>
        </Link>
      )}
    </NavbarContainer>
  );
};
