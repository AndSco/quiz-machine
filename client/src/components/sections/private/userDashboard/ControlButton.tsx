import React from "react";
import styled from "styled-components";
import { BigTitle } from "../../../UI/Titles";
import { breakpoints } from "../../../../constants/breakpoints";
import { Clickable } from "../../../UI/Clickable";

const OptionButton = styled(BigTitle)`
  opacity: ${(props: { isSelected: boolean }) => (props.isSelected ? 1 : 0.5)};

  :hover {
    opacity: 1;
  }

  @media (max-width: ${breakpoints.smallestScreens}) {
    font-size: 1.1rem;
  }
`;

interface Props {
  isSelected: boolean;
  onClickHandler?: () => void;
  text: string;
}

export const ControlButton: React.FC<Props> = ({
  isSelected,
  onClickHandler,
  text
}) => {
  return (
    <Clickable>
      <OptionButton isSelected={isSelected} onClick={onClickHandler}>
        {text}
      </OptionButton>
    </Clickable>
  );
};
