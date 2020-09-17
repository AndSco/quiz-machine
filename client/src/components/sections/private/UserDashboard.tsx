import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AuthContext } from "../../../contexts/auth/Auth";
import { useHistory } from "react-router-dom";
import { MediumButton } from "../../UI/Buttons";
import { QuizCreationForm } from "./QuizCreationForm";
import { QuizOverview } from "./QuizOverview";
import { PrivateQuiz } from "../../../models/PrivateQuiz";
import { BigTitle } from "../../UI/Titles";
import { Wrapper } from "../../UI/Wrapper";
import { Icon } from "../../UI/Icon";
import { Colors } from "../../../constants/colors";

type SectionsToVisit = "quizCreation" | "quizOverview" | "home";

const OptionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 2rem 0;
`;

const OptionButton = styled(MediumButton)`
  width: 250px;
  height: 200px;
  border-radius: 10px;
  margin: 1rem 0;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* color: ${Colors.YELLOW};
  background: white;
  border: 4px solid ${Colors.YELLOW}; */
`;

export const UserDashboard: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const [sectionVisiting, setSectionVisiting] = useState<SectionsToVisit>(
    "home"
  );

  useEffect(() => {
    history.push("/myDashboard");
  }, [history]);

  const changeSection = (section: SectionsToVisit) =>
    setSectionVisiting(section);

  if (!currentUser) return null;

  return (
    <Wrapper>
      {sectionVisiting === "home" ? (
        <>
          <BigTitle>Welcome {currentUser!.username.toUpperCase()}</BigTitle>
          <OptionButtonsContainer>
            <OptionButton onClick={() => changeSection("quizCreation")}>
              Create new quiz
              <Icon
                icon={"plus-circle"}
                size="2x"
                color="white"
                marginTop="1rem"
              />
            </OptionButton>
            <OptionButton onClick={() => changeSection("quizOverview")}>
              See your quizzes
              <Icon icon={"eye"} size="2x" color="white" marginTop="1rem" />
            </OptionButton>
          </OptionButtonsContainer>
        </>
      ) : sectionVisiting === "quizCreation" ? (
        <QuizCreationForm />
      ) : (
        <QuizOverview myQuizzes={currentUser.quizzes as PrivateQuiz[]} />
      )}
    </Wrapper>
  );
};
