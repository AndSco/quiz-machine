import styled from "styled-components";
import { Colors } from "../../constants/colors";
import { fadeIn } from "../../constants/animations";

export const GridCard = styled.div`
  padding: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  text-transform: uppercase;
  background-color: ${Colors.DARK_BLUE};
  font-size: 1.6rem;
  width: calc(100% / 5);
  min-width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 12px;
  background-position: center;
  background-size: cover;
  animation: ${fadeIn} 1.2s ease;

  :hover {
    transform: scale(1.02);

    h3 {
      background-color: ${Colors.YELLOW};
      color: white;
    }
  }
`;
