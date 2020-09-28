import styled from "styled-components";
import { QuizType } from "../../models/PublicQuizQuestion";
import { Colors } from "../../constants/colors";
import { LoginButton } from "../UI/Buttons";
import { breakpoints } from "../../constants/breakpoints";

export const AllLinkWrapper = styled.div`
  display: flex;
  justify-content: flexend;
  align-items: center;

  @media (max-width: ${breakpoints.mediumScreens}) {
    flex-direction: column;
    align-items: flex-end;
    position: fixed;
    top: 0;
    right: 0;
    height: 90vh;
    width: 85vw;
    max-width: 400px;
    padding: 3rem 0;
    background-color: rgba(106, 0, 244, 0.96);
    z-index: 50;
    padding-top: 6rem;
    box-sizing: border-box;
    border-left: 12px solid ${Colors.STEEL_PINK_2};
  }
`;

export const MenuItemsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: ${(props: { flex: number }) => props.flex};

  @media (max-width: ${breakpoints.mediumScreens}) {
    flex-direction: column;
    align-items: flex-end;
    height: 200px;
    justify-content: space-around;
  }
`;

export const NavbarMenuItem = styled.li`
  color: ${(props: { value: QuizType; selectedNow: QuizType }) =>
    props.selectedNow === props.value ? Colors.BLACK : Colors.LIGHTER_GREY};
  border-bottom: ${(props: { value: QuizType; selectedNow: QuizType }) =>
    props.selectedNow === props.value
      ? "4px solid #ffcf10"
      : "4px solid white"};

  padding: 0 0.5rem 4px 0.5rem;
  margin: 0 1.4rem;

  :hover {
    border-bottom: ${(props: { value: QuizType; selectedNow: QuizType }) =>
      props.selectedNow === props.value
        ? "4px solid #ffcf10"
        : "4px solid #b9b5b5"};
  }

  @media (max-width: ${breakpoints.mediumScreens}) {
    font-size: 1.4rem;
    margin: 0;
    padding: 0;
    color: white;
    color: ${(props: { value: QuizType; selectedNow: QuizType }) =>
      props.selectedNow === props.value ? "white" : Colors.LIGHTER_GREY};
  }
`;

export const NavbarContainer = styled.div`
  max-width: 100vw;
  display: flex;
  height: 70px;
  -webkit-box-shadow: 0px 0px 3px -1px rgba(87, 84, 87, 1);
  -moz-box-shadow: 0px 0px 3px -1px rgba(87, 84, 87, 1);
  box-shadow: 0px 0px 3px -1px rgba(87, 84, 87, 1);
  padding: 0 2.5rem 0 1.5rem;
  align-items: center;
  justify-content: space-between;
`;

export const MenuItems = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  font-family: "Fredoka One", cursive;
  cursor: pointer;
  font-size: 0.9rem;
  margin: 0 3rem;
`;

export const BackButton = styled(LoginButton)`
  width: 160px;
`;
