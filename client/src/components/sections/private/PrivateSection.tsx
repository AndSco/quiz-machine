import React, { useContext } from "react";
import { Login } from "../../auth/Login";
import { Register } from "../../auth/Register";
import { AuthScope } from "../../../models/AuthScope";
import { AuthContext } from "../../../contexts/auth/Auth";
import { UserDashboard } from "./UserDashboard";
import { Wrapper } from "../../UI/Wrapper";

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
