import React, { useContext, useEffect } from "react";
import { Form } from "./AuthForm";
import { LoginFormInputsValues } from "../../constants/formInputsValues";
import { SectionTitle, AuthContainer } from "./Styled";
import { AccessSwitch } from "./AccessSwitch";
import { AuthContext } from "../../contexts/auth/Auth";
import { handleSubmit } from "./SubmitFunction";

export const Login: React.FC = () => {
  const { goToPrivateSection } = useContext(AuthContext);

  useEffect(() => {
    goToPrivateSection();
  }, [goToPrivateSection]);

  return (
    <AuthContainer>
      <SectionTitle>Nice to see you back!</SectionTitle>
      <AccessSwitch scope="login" noMargin={true} />
      <Form
        scope="login"
        title="Log in"
        inputs={LoginFormInputsValues}
        onSubmit={handleSubmit}
      />
    </AuthContainer>
  );
};
