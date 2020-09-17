import React, { useContext } from "react";
import { Login } from "../../auth/Login";
import { Register } from "../../auth/Register";
import styled from "styled-components";
import { AuthScope } from "../../../models/AuthScope";
import { AuthContext } from "../../../contexts/auth/Auth";
import { UserDashboard } from "./UserDashboard";
import { Wrapper } from "../../UI/Wrapper";

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

interface Props {
  activity: AuthScope;
}

export const PrivateSection: React.FC<Props> = ({ activity }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <UserDashboard />
  ) : (
    <Wrapper>{activity === "login" ? <Login /> : <Register />}</Wrapper>
  );
};
