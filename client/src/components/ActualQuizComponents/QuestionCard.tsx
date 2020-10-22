import React, { useState } from "react";
import { Question as PublicQuizQuestion } from "../../models/PublicQuizQuestion";
import { PrivateQuizQuestion } from "../../models/PrivateQuiz";
import { Reply } from "./Reply";
import { Icon } from "../UI/Icon";
import {
  CardBottom,
  CardBottomItem,
  NextButton,
  QuestionNumber,
  RepliesContainer,
  StyledCard,
  StyledQuestion,
  CodeContainer
} from "./StyledComponents";
import { registerIcons } from "../../utils/registerFontawesomeIcons";

registerIcons();

interface QuestionCardProps {
  question: PublicQuizQuestion | PrivateQuizQuestion;
  numberOfQuestions: number;
  currentNumberOfQuestion: number;
  next: () => void;
  givePoint: () => void;
  quizType: "private" | "public";
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  next,
  numberOfQuestions,
  currentNumberOfQuestion,
  givePoint,
  quizType
}) => {
  const [hasReplied, setHasReplied] = useState(false);

  const replyQuestion = () => setHasReplied(true);
  const isRightReply = (reply: string) => reply === question.rightReply;

  const goToNextQuestion = () => {
    setHasReplied(false);
    next();
  };

  return (
    <StyledCard>
      <StyledQuestion
        dangerouslySetInnerHTML={{ __html: question.question }}
        data-testid="quiz-question"
      />
      {(question as PrivateQuizQuestion).code && (
        <CodeContainer>
          <pre>
            <code>{(question as PrivateQuizQuestion).code}</code>
          </pre>
        </CodeContainer>
      )}
      <RepliesContainer>
        {question.allReplies
          .filter(reply => reply !== null)
          .map((reply, index) => (
            <Reply
              key={index}
              isRight={isRightReply(reply)}
              hasReplied={hasReplied}
              replyText={reply}
              replyQuestion={replyQuestion}
              givePoint={givePoint}
              replyNumber={index}
              usage="users"
            />
          ))}
      </RepliesContainer>
      <NextButton
        hasReplied={hasReplied}
        disabled={!hasReplied}
        onClick={goToNextQuestion}
      >
        NEXT
      </NextButton>
      <CardBottom>
        {quizType === "public" && (
          <>
            <CardBottomItem>
              <Icon icon={"book-open"} />
              {(question as PublicQuizQuestion).subject}
            </CardBottomItem>
            <CardBottomItem>
              <Icon icon={"tachometer-alt"} />
              {(question as PublicQuizQuestion).difficulty.toUpperCase()}
            </CardBottomItem>
          </>
        )}

        <QuestionNumber>{`${currentNumberOfQuestion}/${numberOfQuestions}`}</QuestionNumber>
      </CardBottom>
    </StyledCard>
  );
};
