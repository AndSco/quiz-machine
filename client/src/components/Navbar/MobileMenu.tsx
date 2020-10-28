import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import { NavbarLinks } from "./NavbarLinks";

interface Props {
  isVisible: boolean;
  closeMenu: () => void;
}

const StyledMobileMenu = styled.div`
  display: ${(props: Pick<Props, "isVisible">) =>
    props.isVisible ? "flex" : "none"};
`;

export const MobileMenu: React.FC<Props> = ({ isVisible, closeMenu }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { current } = componentRef;

  const handleTouch = useCallback(
    e => {
      if (current && current.contains(e.target)) {
        return;
      } else {
        closeMenu();
      }
    },
    [current, closeMenu]
  );

  React.useEffect(() => {
    if (isVisible) {
      document.addEventListener("click", handleTouch);
    }

    return () => {
      document.removeEventListener("click", handleTouch);
    };
  }, [isVisible, handleTouch]);

  return (
    <StyledMobileMenu
      isVisible={isVisible}
      ref={componentRef}
      data-cy="mobile-menu"
    >
      <NavbarLinks closeMenu={closeMenu} />
    </StyledMobileMenu>
  );
};
