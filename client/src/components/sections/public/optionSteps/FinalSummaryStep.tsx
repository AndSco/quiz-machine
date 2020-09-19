import React, { useContext } from "react";
import styled from "styled-components";
import { Colors } from "../../../../constants/colors";
import { getQuestions } from "../../../../utils/functions";
import { StepTemplate } from "./StepTemplate";
import { MediumButton, SecondaryButton } from "../../../UI/Buttons";
import { QuizzesContext } from "../../../../contexts/quizzes/Quizzes";

const StyledFeature = styled.p`
  color: white;
  font-size: 1rem;
  margin: 0.8rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    color: ${Colors.BLACK};
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 0.5rem;
  }
`;

const FeaturesContainer = styled.div`
  width: 50vw;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.YELLOW};
  justify-content: center;
  align-items: center;
`;

const ResetButton: React.FC<{ reset: () => void }> = ({ reset }) => (
  <SecondaryButton onClick={reset}>RESET</SecondaryButton>
);

export const FinalSummaryStep: React.FC = () => {
  const {
    quizType,
    numberOfQuestions,
    difficultyLevel,
    currentSubject,
    uploadQuestions,
    reset
  } = useContext(QuizzesContext);
  return (
    <StepTemplate>
      <FeaturesContainer>
        <StyledFeature>
          Quiz: <span>{quizType}</span>
        </StyledFeature>
        <StyledFeature>
          No. of questions: <span>{numberOfQuestions}</span>
        </StyledFeature>
        <StyledFeature>
          Difficulty: <span>{difficultyLevel || "Any"}</span>
        </StyledFeature>
        <StyledFeature>
          Subject: <span>{currentSubject || "Random"}</span>
        </StyledFeature>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem"
          }}
        >
          <MediumButton
            onClick={async () => {
              const questionsToUpload = await getQuestions({
                quizType,
                difficulty: difficultyLevel,
                numOfQuestions: numberOfQuestions,
                subject: currentSubject
              });

              uploadQuestions(questionsToUpload);
            }}
          >
            START QUIZ
          </MediumButton>
          <ResetButton reset={reset} />
        </div>
      </FeaturesContainer>
    </StepTemplate>
  );
};
