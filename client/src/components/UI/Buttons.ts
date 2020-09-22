import styled from "styled-components";
import { Colors } from "../../constants/colors";

export const BaseButton = styled.button`
  padding: 0.5rem;
  background-color: ${Colors.ORANGE};
  color: white;
  border-radius: 40px;
  border: none;
  width: 250px;
  font-weight: bolder;
  font-size: 1.2rem;
  font-family: "Roboto Slab", serif;

  :hover {
    background-color: ${Colors.DARK_BLUE};
  }
`;

export const MediumButton = styled(BaseButton)`
  background-color: ${Colors.DARK_BLUE};
  margin: 0.5rem 0;
  width: 250px;

  :hover {
    background-color: ${Colors.ORANGE};
  }
`;

export const SecondaryButton = styled(MediumButton)`
  background-color: white;
  border: 1px solid ${Colors.LIGHTER_GREY};
  color: ${Colors.LIGHTER_GREY};

  :hover {
    background-color: ${Colors.ORANGE};
    color: white;
    border: 1px solid ${Colors.YELLOW};
  }
`;

export const LoginButton = styled(BaseButton)`
  width: 100px;
  font-size: 0.8rem;
  padding: 0.5rem 0.5rem;
  background-color: ${Colors.YELLOW};
  color: white;
  margin: 0 6px;

  :hover {
    background-color: white;
    color: ${Colors.YELLOW};
    border: 2px solid ${Colors.YELLOW};
  }
`;

export const RegisterButton = styled(LoginButton)`
  border: 2px solid ${Colors.ORANGE};
  color: ${Colors.ORANGE};
  background-color: white;

  :hover {
    background-color: ${Colors.ORANGE};
    color: white;
    border: none;
  }
`;

export const SmallButton = styled(MediumButton as "div")`
  width: 100px;
  font-size: 0.8rem;
  height: 30px;
  color: ${Colors.ORANGE};
  background-color: white;
  margin-top: 0;

  :hover {
    color: white;
  }
`;
