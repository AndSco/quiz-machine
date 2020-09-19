import React from "react";
import styled from "styled-components";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { Colors } from "../../../constants/colors";
import { GridCard } from "../../UI/GridCard";

const MyStyledQuizCard = styled(GridCard)`
  width: 500px;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  margin: 2rem 0;
  background-image: ${(props: { imageUrl: string }) =>
    `url("${props.imageUrl}")`};

  h3 {
    background-color: ${Colors.YELLOW};
    padding: 0.2rem 0.5rem;
    color: ${Colors.BLACK};
    font-size: 1.5rem;
  }
`;

const ActionButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.h5`
  background-color: white;
  border-radius: 30px;
  font-size: 0.7rem;
  padding: 0.4rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.BLACK};
  opacity: 0.9;
`;

export const MyQuizCard: React.FC<{ quiz: PrivateQuiz }> = ({ quiz }) => {
  console.log("QUIZ is ", quiz);
  return (
    <MyStyledQuizCard imageUrl={quiz.backgroundImageUrl as string}>
      <h3>{quiz.title}</h3>
      <ActionButtonsContainer>
        <ActionButton>Play</ActionButton>
        <ActionButton>Copy url</ActionButton>
        <ActionButton>Edit</ActionButton>
        <ActionButton>Delete</ActionButton>
      </ActionButtonsContainer>
    </MyStyledQuizCard>
  );
};
