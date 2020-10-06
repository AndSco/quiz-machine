import React, { useState, useEffect } from "react";
import { BigTitle, SubTitle } from "../../UI/Titles";
import { GridWrapper } from "../../UI/GridWrapper";
import { FingerDown } from "../../UI/FingerDown";
import { Thumbnail } from "../../UI/Thumbnail";
import { Colors } from "../../../constants/colors";
import { getCustomUsersQuizzes } from "../../../utils/dbFunctions";
import { PrivateQuiz } from "../../../models/PrivateQuiz";

export const UsersCustomQuizzes: React.FC = () => {
  const [usersCustomQuizzes, setUsersCustomQuizzes] = useState<PrivateQuiz[]>(
    []
  );

  const uploadCustomQuizzes = async () => {
    try {
      const dbResponse = await getCustomUsersQuizzes();
      const customQuizzes = dbResponse.payload;
      setUsersCustomQuizzes(customQuizzes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      uploadCustomQuizzes();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <BigTitle>USERS' QUIZZES</BigTitle>
      {usersCustomQuizzes.length === 0 ? (
        <h2 style={{ color: Colors.LIGHTER_GREY }}>
          Users' quizzes coming soon...
        </h2>
      ) : (
        <>
          <SubTitle>
            Try a quiz created by a fellow user <FingerDown />
          </SubTitle>

          <GridWrapper>
            {usersCustomQuizzes
              .sort((a, b) => {
                if (a.title < b.title) {
                  return -1;
                }
                if (a.title > b.title) {
                  return 1;
                }
                return 0;
              })
              .map(quiz => (
                <Thumbnail
                  purpose="userQuizzes"
                  key={quiz.title}
                  title={quiz.title}
                  customQuiz={quiz}
                />
              ))}
          </GridWrapper>
        </>
      )}
    </>
  );
};
