import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";

const ReplyContainer = styled.div`
  padding: 0 2rem;
  display: flex;
  margin-bottom: 1.5rem;
`;

interface ReplyProps {
  isRight: boolean;
  hasReplied: boolean;
  replyText: string;
  replyQuestion: () => void;
  givePoint: () => void;
  replyNumber: number;
  usage?: "API" | "users";
}

type PartialProps = Pick<ReplyProps, "isRight" | "hasReplied">;

interface StyledReplyProps extends PartialProps {
  wasSelected: boolean;
}

const StyledReply = styled.p`
  text-align: left;
  line-height: 24px;
  cursor: ${(props: StyledReplyProps) =>
    props.hasReplied ? "default" : "pointer"};
  margin: 0;
  padding: 0.5rem;
  margin-top: -0.5rem;

  background-color: ${(props: StyledReplyProps) =>
    props.hasReplied && props.isRight
      ? "#31ea31"
      : props.hasReplied && props.wasSelected && !props.isRight
      ? "#ff0f0f"
      : "none"};

  :hover {
    background-color: ${(props: StyledReplyProps) =>
      !props.hasReplied ? "lightgrey" : "none"};
  }
`;

const ReplyNumber = styled.h6`
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  color: ${Colors.LIGHTER_GREY};
  border: 1px solid;
  margin: 0;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Reply: React.FC<ReplyProps> = ({
  hasReplied,
  isRight,
  replyText,
  replyQuestion,
  givePoint,
  replyNumber,
  usage = "API"
}) => {
  const [wasSelected, setWasSelected] = useState(false);

  useEffect(() => {
    if (!hasReplied) {
      setWasSelected(false);
    }
  }, [hasReplied]);

  return (
    <ReplyContainer>
      <ReplyNumber>{replyNumber + 1}</ReplyNumber>
      {usage === "API" ? (
        <StyledReply
          hasReplied={hasReplied}
          isRight={isRight}
          wasSelected={wasSelected}
          onClick={() => {
            if (hasReplied) return;
            setWasSelected(true);
            replyQuestion();
            if (isRight) {
              givePoint();
            }
          }}
          dangerouslySetInnerHTML={{ __html: replyText }}
        />
      ) : (
        <StyledReply
          hasReplied={hasReplied}
          isRight={isRight}
          wasSelected={wasSelected}
          onClick={() => {
            if (hasReplied) return;
            setWasSelected(true);
            replyQuestion();
            if (isRight) {
              givePoint();
            }
          }}
        >
          {replyText}
        </StyledReply>
      )}
    </ReplyContainer>
  );
};
