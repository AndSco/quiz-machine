import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { Clickable } from "../UI/Clickable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const IconContainer = styled(Clickable)`
  position: absolute;
  left: calc(50% + 158px);
  padding-bottom: ${(props: Pick<Props, "paddingBottom">) =>
    props.paddingBottom};
`;

interface Props {
  icon: IconProp;
  onCLickFunction: any;
  paddingBottom?: string | 0;
}

export const IconForInput: React.FC<Props> = ({
  icon,
  onCLickFunction,
  paddingBottom = 0
}) => {
  return (
    <IconContainer paddingBottom={paddingBottom}>
      <FontAwesomeIcon
        icon={icon}
        onClick={onCLickFunction}
        color={Colors.LIGHTER_GREY}
      />
    </IconContainer>
  );
};
