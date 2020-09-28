import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { AuthButtons, NavbarLinks } from "./NavbarLinks";

interface Props {
  isVisible: boolean;
  closeMenu: () => void;
}

const StyledMobileMenu = styled.div`
  display: ${(props: Omit<Props, "closeMenu">) =>
    props.isVisible ? "flex" : "none"};
`;

export const MobileMenu: React.FC<Props> = ({ isVisible, closeMenu }) => {
  return (
    <StyledMobileMenu isVisible={isVisible}>
      <NavbarLinks closeMenu={closeMenu} />
    </StyledMobileMenu>
  );
};
