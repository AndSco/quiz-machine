import React from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { Colors } from "../constants/colors";
import { QuizType } from "../models/Question";
import { StyledButton } from "./QuizChoiceButton";

const NavbarContainer = styled.div`
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
  width: 500px;
  font-family: "Fredoka One", cursive;
  cursor: pointer;
  font-size: 0.9rem;
`;

const MenuItem = styled.li`
  color: ${(props: { value: QuizType; selectedNow: QuizType }) =>
    props.selectedNow === props.value ? Colors.BLACK : Colors.LIGHTER_GREY};
  border-bottom: ${(props: { value: QuizType; selectedNow: QuizType }) =>
    props.selectedNow === props.value
      ? "4px solid #ffcf10"
      : "4px solid white"};

  padding-bottom: 4px;

  :hover {
    border-bottom: ${(props: { value: QuizType; selectedNow: QuizType }) =>
      props.selectedNow === props.value
        ? "4px solid #ffcf10"
        : "4px solid #b9b5b5"};
  }
`;

const LoginButton = styled(StyledButton)`
  width: 100px;
  font-size: 0.8rem;
  padding: 0.5rem 0.5rem;
  background-color: white;
  border: 2px solid ${Colors.YELLOW};
  color: ${Colors.YELLOW};
  margin-left: -40px;

  :hover {
    background-color: ${Colors.YELLOW};
    color: white;
  }
`;

interface NavbarProps {
  selectedQuiz: QuizType;
  chooseQuiz: (quizType: QuizType) => void;
  reset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedQuiz,
  chooseQuiz,
  reset
}) => {
  return (
    <NavbarContainer>
      <Logo reset={reset} />
      <MenuItems>
        <MenuItem
          value={QuizType.TRIVIA}
          selectedNow={selectedQuiz}
          onClick={() => chooseQuiz(QuizType.TRIVIA)}
        >
          TRIVIA QUIZ
        </MenuItem>
        <MenuItem
          value={QuizType.PROGRAMMING}
          selectedNow={selectedQuiz}
          onClick={() => chooseQuiz(QuizType.PROGRAMMING)}
        >
          PROGRAMMING QUIZ
        </MenuItem>
        <LoginButton>Login</LoginButton>
      </MenuItems>
    </NavbarContainer>
  );
};
