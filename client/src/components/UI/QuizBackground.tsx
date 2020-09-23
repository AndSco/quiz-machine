import React from "react";
import styled from "styled-components";
import { Clickable } from "./Clickable";
import { Icon } from "./Icon";
import { Colors } from "../../constants/colors";

export const StyledQuizBackground = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  background-image: ${(props: { imageUrl: string }) =>
    `url("${props.imageUrl}")`};
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StopQuizButton = styled(Clickable)`
  position: fixed;
  top: 40px;
  right: 40px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: ${Colors.BLACK};

    svg {
      color: white;
    }
  }
`;

interface Props {
  imageUrl: string;
  stopPlaying: () => void;
}

export const QuizBackground: React.FC<Props> = ({
  children,
  imageUrl,
  stopPlaying
}) => {
  return (
    <StyledQuizBackground imageUrl={imageUrl}>
      <StopQuizButton onClick={stopPlaying}>
        <Icon icon="times-circle" size="2x" color={Colors.BLACK} />
      </StopQuizButton>
      {children}
    </StyledQuizBackground>
  );
};
