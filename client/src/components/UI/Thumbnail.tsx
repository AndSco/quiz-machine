import React, { useContext } from "react";
import { GridCard } from "./GridCard";
import { QuizzesContext } from "../../contexts/quizzes/Quizzes";
import { getSubjectBackgroundPic } from "../../utils/functions";
import { Title } from "../UI/Titles";
import { PrivateQuiz } from "../../models/PrivateQuiz";
import { Link } from "react-router-dom";

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
      <Link to={`/quiz/${customQuiz!._id}`}>
        <GridCard
          style={{
            backgroundImage: `url("${customQuiz!.backgroundImageUrl})"`
          }}
        >
          <Title>{title}</Title>
          {/* <h6>by {customQuiz!.}</h6> */}
        </GridCard>
      </Link>
    );

  return toRender;
};
