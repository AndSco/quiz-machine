import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginButton, RegisterButton, LogoutButton } from "../UI/Buttons";
import {
  MenuItemsContainer,
  MenuItems,
  NavbarMenuItem,
  BackButton,
  AllLinkWrapper
} from "./NavbarComponents";
import { QuizType } from "../../models/PublicQuizQuestion";
import { AuthContext } from "../../contexts/auth/Auth";
import { QuizzesContext } from "../../contexts/quizzes/Quizzes";

export const AuthButtons: React.FC<{ closeMenu: () => void }> = ({
  closeMenu
}) => {
  return (
    <MenuItemsContainer flex={1} className="auth-buttons">
      <Link to="/login">
        <LoginButton onClick={closeMenu} className="buttons">
          Login
        </LoginButton>
      </Link>
      <Link to="/register">
        <RegisterButton onClick={closeMenu} className="buttons">
          Register
        </RegisterButton>
      </Link>
    </MenuItemsContainer>
  );
};

export const NavbarLinks: React.FC<{ closeMenu: () => void }> = ({
  closeMenu
}) => {
  const { quizType, configQuiz } = useContext(QuizzesContext);
  const { currentUser, isInPrivateSection, logout } = useContext(AuthContext);
  const history = useHistory();

  return (
    <AllLinkWrapper>
      {!isInPrivateSection && (
        <MenuItems>
          <MenuItemsContainer flex={2}>
            <NavbarMenuItem
              value={QuizType.TRIVIA}
              selectedNow={quizType}
              onClick={() => {
                configQuiz("quizType", QuizType.TRIVIA);
                closeMenu();
              }}
            >
              TRIVIA QUIZ
            </NavbarMenuItem>

            <NavbarMenuItem
              value={QuizType.PROGRAMMING}
              selectedNow={quizType}
              onClick={() => {
                configQuiz("quizType", QuizType.PROGRAMMING);
                closeMenu();
              }}
            >
              PROGRAMMING QUIZ
            </NavbarMenuItem>

            <NavbarMenuItem
              value={QuizType.USERS_QUIZZES}
              selectedNow={quizType}
              onClick={() => {
                configQuiz("quizType", QuizType.USERS_QUIZZES);
                closeMenu();
              }}
            >
              USERS' QUIZZES
            </NavbarMenuItem>
          </MenuItemsContainer>
        </MenuItems>
      )}

      {!isInPrivateSection && !currentUser ? (
        <AuthButtons closeMenu={closeMenu} />
      ) : isInPrivateSection ? (
        <Link to="/">
          <BackButton className="back-button" onClick={closeMenu}>
            Back to quiz section
          </BackButton>
        </Link>
      ) : (
        <Link to="/myDashboard">
          <BackButton className="back-button" onClick={closeMenu}>
            Your dashboard
          </BackButton>
        </Link>
      )}

      {currentUser && (
        <LogoutButton
          className="logout-button"
          onClick={() => {
            closeMenu();
            logout();
            history.push("/");
          }}
        >
          Log out
        </LogoutButton>
      )}
    </AllLinkWrapper>
  );
};
