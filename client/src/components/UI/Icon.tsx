import React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Colors } from "../../constants/colors";

interface Props {
  icon: IconProp;
  size?: FontAwesomeIconProps["size"];
  color?: string;
  marginTop?: string;
  sideMargin?: string;
}

export const Icon: React.FC<Props> = ({
  icon,
  size = "1x",
  color = Colors.LIGHTER_GREY,
  marginTop = 0,
  sideMargin = "7px"
}) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size}
      color={color}
      style={{ margin: `0 ${sideMargin}`, marginTop: marginTop }}
    />
  );
};
