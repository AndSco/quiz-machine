import React, { useState } from "react";
import styled from "styled-components";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { Colors } from "../../../constants/colors";
import { GridCard } from "../../UI/GridCard";
import { Link } from "react-router-dom";
import { copyQuizUrlToCipboard } from "../../../utils/functions";
import { Icon } from "../../UI/Icon";
import { WarningMessage } from "./WarningMessage";

const MyStyledQuizCard = styled(GridCard)`
  width: 60vw;
  padding: 0;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  margin: 2rem 0;
  background-image: ${(props: { imageUrl: string }) =>
    `url("${props.imageUrl}")`};
  cursor: inherit;

  h3 {
    background-color: ${Colors.YELLOW};
    padding: 0.2rem 1.5rem;
    color: ${Colors.BLACK};
    font-size: 1.5rem;
  }
`;

const ActionButtonsContainer = styled.div`
  width: 90%;
  align-self: center;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.h5`
  border-radius: 30px;
  background-color: ${Colors.BLACK};
  color: white;
  font-size: 0.7rem;
  padding: 0.4rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.9;
  cursor: pointer;

  :hover {
    background-color: white;
    color: ${Colors.BLACK};
  }
`;

interface Props {
  quiz: PrivateQuiz;
  editQuiz: (quiz: PrivateQuiz) => void;
}

export const MyQuizCard: React.FC<Props> = ({ quiz, editQuiz }) => {
  const quizUrl = `quiz/${quiz._id}`;
  const [wantsToDeleteQuiz, setWantsToDeleteQuiz] = useState(false);

  return (
    <MyStyledQuizCard imageUrl={quiz.backgroundImageUrl as string}>
      {!wantsToDeleteQuiz ? (
        <>
          <h3>{quiz.title}</h3>
          <ActionButtonsContainer>
            <Link to={quizUrl}>
              <ActionButton>
                <Icon icon="puzzle-piece" color="lightgrey" />
                Take quiz
              </ActionButton>
            </Link>
            <ActionButton onClick={() => copyQuizUrlToCipboard(quizUrl)}>
              <Icon icon="link" color="lightgrey" />
              Copy url
            </ActionButton>
            <ActionButton onClick={() => editQuiz(quiz)}>
              <Icon icon="edit" color="lightgrey" />
              Edit
            </ActionButton>
            <ActionButton
              onClick={() => {
                setWantsToDeleteQuiz(true);
              }}
            >
              <Icon icon="trash-alt" color="lightgrey" />
              Delete
            </ActionButton>
          </ActionButtonsContainer>
        </>
      ) : (
        <WarningMessage
          cancelDeletionProcess={() => setWantsToDeleteQuiz(false)}
          quizId={quiz._id as string}
        />
      )}
    </MyStyledQuizCard>
  );
};
