import styled from "styled-components";
import { QuizType } from "../../models/PublicQuizQuestion";
import { Colors } from "../../constants/colors";
import { LoginButton } from "../UI/Buttons";
import { breakpoints } from "../../constants/breakpoints";

export const AllLinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${breakpoints.mediumScreens}) {
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    right: 0;
    min-height: 550px;
    width: 350px;
    padding: 3rem;
    padding-bottom: 4rem;
    background-color: rgba(106, 0, 244, 0.96);
    z-index: 50;
    padding-top: 6rem;
    box-sizing: border-box;
    border-left: 12px solid ${Colors.STEEL_PINK_2};
    border-bottom: 12px solid ${Colors.STEEL_PINK_2};
    border-bottom-left-radius: 40px;

    .auth-buttons {
      flex-direction: row;

      .buttons {
        font-size: 1.3rem;
        color: white;
        background: none;
        border: 2px solid;
      }
    }

    .back-button,
    .logout-button {
      font-size: 18px;
      color: white;
      background: none;
      width: 250px;
      border-radius: 0;
      padding-bottom: 10px;
      border: 0;
      border-bottom: 2px solid;
      text-transform: uppercase;
      margin-top: 1.5rem;
      font-weight: 600;
    }

    .back-button:hover,
    .logout-button:hover {
      background: none;
      border: none;
      border-bottom: 2px solid ${Colors.YELLOW};
      color: white;
    }
  }
`;

export const MobileAuthButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;

  h4 {
    border-top: 2px solid white;
    padding: 4px;
    padding-top: 2rem;
    color: lightgray;
    font-size: 1.1rem;
  }

  div {
    display: flex;

    .buttons {
      font-size: 16px;
      color: white;
      background: none;
      border: 2px solid;
      padding: 0.3rem 0.5rem;
    }
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
    height: 160px;
    justify-content: space-around;
    margin-bottom: 3rem;
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
    font-size: 18px;
    margin: 0;
    padding: 0;
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
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 3rem;
`;

export const BackButton = styled(LoginButton)`
  width: 160px;
`;
