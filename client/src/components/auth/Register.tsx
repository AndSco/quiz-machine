import React from "react";
import { Form } from "../UI/Form";
import { RegistrationStartingValues } from "../../constants/formInputsValues";
import { SectionTitle } from "./Styled";
import { Colors } from "../../constants/colors";
import { AccessSwitch } from "./AccessSwitch";

export const Register: React.FC = () => {
  return (
    <>
      <div>
        <SectionTitle>Join the community!</SectionTitle>
        <p style={{ color: Colors.LIGHTER_GREY, marginBottom: "2rem" }}>
          Register to create & share custom private quizzes
        </p>
      </div>
      <Form
        scope="register"
        title="register"
        inputs={RegistrationStartingValues}
      />
      <AccessSwitch scope="register" />
    </>
  );
};
