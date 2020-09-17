import React, { useContext, useEffect } from "react";
import { Form } from "./AuthForm";
import { LoginFormInputsValues } from "../../constants/formInputsValues";
import { SectionTitle } from "./Styled";
import { AccessSwitch } from "./AccessSwitch";
import { AuthContext } from "../../contexts/auth/Auth";

export const Login: React.FC = () => {
  const { goToPrivateSection } = useContext(AuthContext);

  useEffect(() => {
    goToPrivateSection();
  }, [goToPrivateSection]);

  return (
    <>
      <SectionTitle>Nice to see you back!</SectionTitle>
      <Form scope="login" title="Log in" inputs={LoginFormInputsValues} />
      <AccessSwitch scope="login" />
    </>
  );
};

// import React, { useContext, useEffect, useState } from "react";
// import { Form } from "./AuthForm";
// import { LoginFormInputsValues } from "../../constants/formInputsValues";
// import { SectionTitle } from "./Styled";
// import { AccessSwitch } from "./AccessSwitch";
// import { AuthContext } from "../../contexts/auth/Auth";
// import { UniversalForm } from "../UniversalForm";
// import { AuthReducers } from "../../reducers/AuthReducers";
// import { ApiResponse } from "../../models/ApiResponse";
// import { loginUser } from "../../utils/dbFunctions";

// export const Login: React.FC = () => {
//   const { goToPrivateSection } = useContext(AuthContext);
//   const { loadCurrentUser } = useContext(AuthContext);
//   const [message, setMessage] = useState("");

//   const loginSubmit = async (inputValues: any) => {
//     const response: ApiResponse = await loginUser(inputValues);
//     console.log("RESSSS", response);
//     if (response.message) {
//       setMessage(response.message);
//       return;
//     }
//     loadCurrentUser(response.payload);
//   };

//   const resetMessage = () => setMessage("");

//   useEffect(() => {
//     goToPrivateSection();
//   }, [goToPrivateSection]);

//   return (
//     <>
//       <SectionTitle>Nice to see you back!</SectionTitle>
//       <UniversalForm
//         inputs={LoginFormInputsValues}
//         inputStartingValues={AuthReducers.login.startingValues}
//         reducer={AuthReducers.login.reducer}
//         title="LOG TEST"
//         handleSubmit={loginSubmit}
//         message={message}
//         resetMessage={resetMessage}
//       />
//     </>
//   );
// };
