import React from "react";
import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { breakpoints } from "../../constants/breakpoints";
import { Clickable } from "../UI/Clickable";

interface Props {
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const StyledBurgerIcon = styled.div`
  display: none;
  width: 2rem;
  height: 2rem;
  z-index: 100;
  position: ${(props: { isMenuOpen: boolean }) =>
    props.isMenuOpen ? "fixed" : "absolute"};
  right: 40px;
  top: 20px;

  @media (max-width: ${breakpoints.mediumScreens}) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${(props: { isMenuOpen: boolean }) =>
      props.isMenuOpen ? "white" : Colors.BLACK};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.2s linear;

    &:nth-child(1) {
      transform: ${({ isMenuOpen }) =>
        isMenuOpen ? "rotate(45deg)" : "rotate(0)"};
    }

    &:nth-child(2) {
      transform: ${({ isMenuOpen }) =>
        isMenuOpen ? "translateX(100%)" : "translateX(0)"};
      opacity: ${({ isMenuOpen }) => (isMenuOpen ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ isMenuOpen }) =>
        isMenuOpen ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`;

export const BurgerIcon: React.FC<Props> = ({
  isMenuOpen,
  openMenu,
  closeMenu
}) => {
  return (
    <Clickable>
      <StyledBurgerIcon
        isMenuOpen={isMenuOpen}
        onClick={() => {
          isMenuOpen ? closeMenu() : openMenu();
        }}
      >
        <div />
        <div />
        <div />
      </StyledBurgerIcon>
    </Clickable>
  );
};
