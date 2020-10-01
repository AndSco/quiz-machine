import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginButton, RegisterButton, LogoutButton } from "../UI/Buttons";
import {
  MenuItemsContainer,
  MenuItems,
  NavbarMenuItem,
  BackButton,
  AllLinkWrapper,
  MobileAuthButtonsContainer
} from "./NavbarComponents";
import { QuizType } from "../../models/PublicQuizQuestion";
import { AuthContext } from "../../contexts/auth/Auth";
import { QuizzesContext } from "../../contexts/quizzes/Quizzes";
import { useWindowWidth } from "../../utils/hooks/useWindowWidth";
import { breakpoints } from "../../constants/breakpoints";
import { extractNumberFromBreakpoint } from "../../utils/functions";

type MenuCloser = {
  closeMenu: () => void;
};

export const CreateYourQuiz: React.FC<MenuCloser> = ({ closeMenu }) => {
  return (
    <Link to="/login">
      <BackButton className="buttons" onClick={closeMenu}>
        Create your own quiz
      </BackButton>
    </Link>
  );
};

export const AuthButtons: React.FC<MenuCloser> = ({ closeMenu }) => {
  return (
    <MobileAuthButtonsContainer>
      <h4>Create your own quiz!</h4>
      <div>
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
      </div>
    </MobileAuthButtonsContainer>
  );
};

export const NavbarLinks: React.FC<MenuCloser> = ({ closeMenu }) => {
  const { quizType, configQuiz } = useContext(QuizzesContext);
  const { currentUser, isInPrivateSection, logout } = useContext(AuthContext);
  const history = useHistory();
  const windowWidth = useWindowWidth();

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
        windowWidth <=
        extractNumberFromBreakpoint(breakpoints.mediumScreens) ? (
          <AuthButtons closeMenu={closeMenu} />
        ) : (
          <CreateYourQuiz closeMenu={closeMenu} />
        )
      ) : isInPrivateSection ? (
        <Link to="/">
          <BackButton className="back-button" onClick={closeMenu}>
            Back to quiz section
          </BackButton>
        </Link>
      ) : (
        <Link to="/myDashboard">
          <BackButton className="back-button" onClick={closeMenu}>
            Your quizzes
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
