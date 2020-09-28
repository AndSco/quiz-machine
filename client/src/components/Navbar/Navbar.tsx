import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { QuizzesContext } from "../../contexts/quizzes/Quizzes";
import { NavbarContainer } from "./NavbarComponents";
import { NavbarLinks } from "./NavbarLinks";
import { BurgerIcon } from "./BurgerIcon";
import { MobileMenu } from "./MobileMenu";
import { useWindowWidth } from "../../utils/hooks/useWindowWidth";
import { breakpoints } from "../../constants/breakpoints";

export const Navbar: React.FC = () => {
  const { reset } = useContext(QuizzesContext);

  // Mobile menu
  const width = useWindowWidth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openMenu = () => setIsMobileMenuOpen(true);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <NavbarContainer>
      <Link to="">
        <Logo reset={reset} />
      </Link>
      <BurgerIcon
        isMenuOpen={isMobileMenuOpen}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />
      {width <= +breakpoints.mediumScreens.split("px")[0] ? (
        isMobileMenuOpen && (
          <MobileMenu isVisible={isMobileMenuOpen} closeMenu={closeMenu} />
        )
      ) : (
        <NavbarLinks closeMenu={closeMenu} />
      )}
    </NavbarContainer>
  );
};
