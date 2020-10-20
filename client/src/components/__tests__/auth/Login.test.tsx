import React from "react";
import { render, wait } from "@testing-library/react";
import { Login } from "../../auth/Login";
import { BrowserRouter as Router } from "react-router-dom";

const renderComponent = () => {
  return render(
    <Router>
      <Login />
    </Router>
  );
};

describe("Login component", () => {
  test("it renders correctly", () => {
    const { getByText, getByLabelText } = renderComponent();

    getByText("Nice to see you back!");
    getByText("Not a member yet?");
    getByText("REGISTER");
    getByText("Log in");
    getByLabelText(/username/i);
    getByLabelText(/password/i);
    getByText(/enter/i);
  });
});
