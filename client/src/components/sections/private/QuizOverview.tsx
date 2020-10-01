import React, { useState } from "react";
import styled from "styled-components";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { BigTitle } from "../../UI/Titles";
import { GridWrapper } from "../../UI/GridWrapper";
import { MyQuizCard } from "./MyQuizCard";
import { QuizCreationOrEditForm } from "./quizForm/QuizCreationOrEditForm";
import { Modal } from "../../UI/Modal";
import { Clickable } from "../../UI/Clickable";
import { breakpoints } from "../../../constants/breakpoints";

const OptionsContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
`;

const OptionButton = styled(BigTitle)`
  opacity: ${(props: { isSelected: boolean }) => (props.isSelected ? 1 : 0.5)};

  :hover {
    opacity: 1;
  }

  @media (max-width: ${breakpoints.smallestScreens}) {
    font-size: 1.1rem;
  }
`;

const Wrapper = styled(GridWrapper)`
  flex-wrap: nowrap;
  flex-direction: column;
`;
interface Props {
  myQuizzes: PrivateQuiz[];
}

export const QuizOverview: React.FC<Props> = ({ myQuizzes }) => {
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [quizNowEditing, setQuizNowEditing] = useState<PrivateQuiz | null>(
    null
  );
  const [sectionShowing, setSectionShowing] = useState<
    "quizList" | "creationForm"
  >("quizList");

  const startEditingQuiz = (quiz: PrivateQuiz) => {
    setQuizNowEditing(quiz);
    setIsEditingQuiz(true);
  };

  return (
    <>
      {isEditingQuiz ? (
        <Modal handleClose={() => setIsEditingQuiz(false)}>
          <QuizCreationOrEditForm
            usage="editing"
            currentQuiz={quizNowEditing as PrivateQuiz}
            onFormClose={() => setIsEditingQuiz(false)}
          />
        </Modal>
      ) : (
        <>
          <OptionsContainer>
            <Clickable>
              <OptionButton
                isSelected={sectionShowing === "quizList"}
                onClick={() => setSectionShowing("quizList")}
              >
                Your quizzes
              </OptionButton>
            </Clickable>
            <Clickable>
              <OptionButton
                isSelected={sectionShowing === "creationForm"}
                onClick={() => setSectionShowing("creationForm")}
              >
                Create a new quiz
              </OptionButton>
            </Clickable>
          </OptionsContainer>

          {sectionShowing === "quizList" ? (
            <Wrapper>
              {myQuizzes.map((quiz, index) => (
                <MyQuizCard
                  quiz={quiz}
                  key={index}
                  editQuiz={startEditingQuiz}
                />
              ))}
            </Wrapper>
          ) : (
            <Modal handleClose={() => setSectionShowing("quizList")}>
              <QuizCreationOrEditForm
                onFormClose={() => setSectionShowing("quizList")}
                usage="creation"
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
};
