import React, { useContext } from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { Colors } from "../constants/colors";
import { QuizType } from "../models/PublicQuizQuestion";
import { Link } from "react-router-dom";
import { LoginButton, RegisterButton } from "./UI/Buttons";
import { AuthContext } from "../contexts/auth/Auth";
import { QuizzesContext } from "../contexts/quizzes/Quizzes";
import {
  NavbarContainer,
  MenuItemsContainer,
  MenuItems,
  NavbarMenuItem,
  BackButton
} from "./UI/NavbarComponents";

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
            <NavbarMenuItem
              value={QuizType.TRIVIA}
              selectedNow={quizType}
              onClick={() => configQuiz("quizType", QuizType.TRIVIA)}
            >
              TRIVIA QUIZ
            </NavbarMenuItem>

            <NavbarMenuItem
              value={QuizType.PROGRAMMING}
              selectedNow={quizType}
              onClick={() => configQuiz("quizType", QuizType.PROGRAMMING)}
            >
              PROGRAMMING QUIZ
            </NavbarMenuItem>

            <NavbarMenuItem
              value={QuizType.USERS_QUIZZES}
              selectedNow={quizType}
              onClick={() => configQuiz("quizType", QuizType.USERS_QUIZZES)}
            >
              USERS' QUIZZES
            </NavbarMenuItem>
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
          <BackButton>Your dashboard</BackButton>
        </Link>
      )}
    </NavbarContainer>
  );
};
