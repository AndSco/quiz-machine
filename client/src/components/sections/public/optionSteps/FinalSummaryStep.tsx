import React, { useContext } from "react";
import styled from "styled-components";
import { Colors } from "../../../../constants/colors";
import { StepTemplate } from "./StepTemplate";
import { MediumButton, SecondaryButton } from "../../../UI/Buttons";
import { ErrorMessage } from "../../../UI/ErrorMessage";
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

const StyledResetButton = styled(SecondaryButton)`
  align-self: center;
`;

const ResetButton: React.FC<{ reset: () => void }> = ({ reset }) => (
  <StyledResetButton onClick={reset}>RESET</StyledResetButton>
);

export const FinalSummaryStep: React.FC = () => {
  const {
    quizType,
    numberOfQuestions,
    difficultyLevel,
    currentSubject,
    reset,
    getPublicQuizQuestions,
    quizFetchError
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
          {!quizFetchError ? (
            <MediumButton
              onClick={async () => {
                try {
                  getPublicQuizQuestions();
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              START QUIZ
            </MediumButton>
          ) : (
            <ErrorMessage>{quizFetchError.message}</ErrorMessage>
          )}
          <ResetButton reset={reset} />
        </div>
      </FeaturesContainer>
    </StepTemplate>
  );
};
