import React from "react";
import { StyledBackgroundImagePreview } from "./Styled";
import { StyledLabel } from "../../../UI/Input";
import { FlexColumn } from "../../../UI/FlexColumn";
import { Clickable } from "../../../UI/Clickable";

interface Props {
  imageUrl: string;
  changeBackground: () => void;
}

export const BackgroundImagePreview: React.FC<Props> = ({
  imageUrl,
  changeBackground
}) => {
  return (
    <FlexColumn>
      <StyledLabel>QUIZ BACKGROUND (click to change)</StyledLabel>
      <Clickable onClick={changeBackground}>
        <StyledBackgroundImagePreview src={imageUrl} />
      </Clickable>
    </FlexColumn>
  );
};
