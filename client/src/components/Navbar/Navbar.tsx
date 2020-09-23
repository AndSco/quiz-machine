import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Logo } from "./Logo";
import { QuizType } from "../../models/PublicQuizQuestion";

import { LoginButton, RegisterButton, LogoutButton } from "../UI/Buttons";
import { AuthContext } from "../../contexts/auth/Auth";
import { QuizzesContext } from "../../contexts/quizzes/Quizzes";
import {
  NavbarContainer,
  MenuItemsContainer,
  MenuItems,
  NavbarMenuItem,
  BackButton,
  AllLinkWrapper
} from "./NavbarComponents";

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
  const { currentUser, isInPrivateSection, logout } = useContext(AuthContext);
  const history = useHistory();

  return (
    <NavbarContainer>
      <Link to="">
        <Logo reset={reset} />
      </Link>

      <AllLinkWrapper>
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
            <BackButton>Back to quiz section</BackButton>
          </Link>
        ) : (
          <Link to="/myDashboard">
            <BackButton>Your dashboard</BackButton>
          </Link>
        )}

        {currentUser && (
          <LogoutButton
            onClick={() => {
              logout();
              history.push("/");
            }}
          >
            Log out
          </LogoutButton>
        )}
      </AllLinkWrapper>
    </NavbarContainer>
  );
};
