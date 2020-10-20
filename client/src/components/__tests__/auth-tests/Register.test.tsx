import React from "react";
import { render } from "@testing-library/react";
import { Register } from "../../auth/Register";
import { BrowserRouter as Router } from "react-router-dom";

const renderComponent = () => {
  return render(
    <Router>
      <Register />
    </Router>
  );
};

describe("Register component", () => {
  test("it renders correctly", () => {
    const { getByText, getByLabelText } = renderComponent();

    getByText("Join the community!");
    getByText("Register to create & share custom quizzes");
    getByText("register");
    getByText("Already registered?");
    getByText("LOGIN");
    getByLabelText("USERNAME (at least 4 characters)");
    getByLabelText("PASSWORD (at least 7 characters)");
    getByLabelText("CONFIRM YOUR PASSWORD");
    getByText("JOIN");
  });
});
