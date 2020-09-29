import React, { useContext } from "react";
import styled from "styled-components";
import { GridCard } from "./GridCard";
import { QuizzesContext } from "../../contexts/quizzes/Quizzes";
import { getSubjectBackgroundPic } from "../../utils/functions";
import { Title } from "../UI/Titles";
import { PrivateQuiz } from "../../models/PrivateQuiz";
import { Link } from "react-router-dom";
import { breakpoints } from "../../constants/breakpoints";

const LinkContainer = styled(Link)`
  display: flex;
  margin: 0;

  @media (max-width: ${breakpoints.smallScreens}) {
    width: 100%;
  }
`;

interface Props {
  purpose: "userQuizzes" | "apiQuizzes";
  title: string;
  value?: string;
  customQuiz?: PrivateQuiz;
}

export const Thumbnail: React.FC<Props> = ({
  purpose,
  title,
  value,
  customQuiz
}) => {
  const { configQuiz, goToNextQuizConfiguration } = useContext(QuizzesContext);

  const apiQuizOnClickHandler = () => {
    configQuiz("subject", value);
    goToNextQuizConfiguration();
  };

  const toRender =
    purpose === "apiQuizzes" ? (
      <GridCard
        onClick={apiQuizOnClickHandler}
        style={{ backgroundImage: `url("${getSubjectBackgroundPic(value)})"` }}
      >
        <Title>{title}</Title>
      </GridCard>
    ) : (
      <LinkContainer to={`/quiz/${customQuiz!._id}`}>
        <GridCard
          style={{
            backgroundImage: `url("${customQuiz!.backgroundImageUrl})"`
          }}
        >
          <Title>{title}</Title>
          {/* <h6>by {customQuiz!.createdBy}</h6> */}
        </GridCard>
      </LinkContainer>
    );

  return toRender;
};
