import styled from "styled-components";
import { QuizType } from "../../models/PublicQuizQuestion";
import { Colors } from "../../constants/colors";
import { LoginButton } from "../UI/Buttons";

export const AllLinkWrapper = styled.div`
  display: flex;
  justify-content: flexend;
  align-items: center;
`;

export const MenuItemsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: ${(props: { flex: number }) => props.flex};
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
