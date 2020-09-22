import React from "react";
import { BigTitle, SubTitle } from "../../../UI/Titles";
import { QuizType, Subject } from "../../../../models/PublicQuizQuestion";
import { shortenLengthySubjects } from "../../../../utils/functions";
import {
  ProgrammingCategories,
  TriviaCategories
} from "../../../../constants/questionCategories";
import { GridWrapper } from "../../../UI/GridWrapper";
import { FingerDown } from "../../../UI/FingerDown";
import { UsersCustomQuizzes } from "../UsersCustomQuizzes";
import { Thumbnail } from "../../../UI/Thumbnail";

interface Props {
  quizType: QuizType;
}

export const SubjectsStep: React.FC<Props> = ({ quizType }) => {
  if (quizType === QuizType.USERS_QUIZZES) return <UsersCustomQuizzes />;

  const availableSubjects =
    quizType === QuizType.TRIVIA ? TriviaCategories : ProgrammingCategories;
  return (
    <>
      <BigTitle>{quizType.toUpperCase()} QUIZ</BigTitle>
      <SubTitle>
        Choose a topic <FingerDown />
      </SubTitle>
      <GridWrapper>
        {availableSubjects
          .sort((a, b) => {
            if (a! < b!) {
              return -1;
            }
            if (a! > b!) {
              return 1;
            }
            return 0;
          })
          .map(subject => (
            <Thumbnail
              purpose="apiQuizzes"
              key={subject}
              title={shortenLengthySubjects(subject as string)!}
              value={subject as Subject}
            />
          ))}
        <Thumbnail purpose="apiQuizzes" title="Random" value="" />
      </GridWrapper>
    </>
  );
};
