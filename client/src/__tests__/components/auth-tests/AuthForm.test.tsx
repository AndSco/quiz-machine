jest.mock("../../../components/auth/SubmitFunction.ts");
import React from "react";
import { render, wait, screen } from "@testing-library/react";
import { Form } from "../../../components/auth/AuthForm";
import userEvent from "@testing-library/user-event";
import {
  handleSubmit,
  AuthResponse
} from "../../../components/auth/SubmitFunction";
import { AuthScope } from "../../../models/AuthScope";
import { AuthInputConfig } from "../../../constants/formInputsValues";

const fakeResponse: AuthResponse = {
  status: "failure",
  message: null,
  error: "Wrong username or password. Try again!",
  payload: null
};

export const basicInputs = [
  { name: "username", label: "username" },
  { name: "password" }
];

const renderComponent = (scope: AuthScope) => {
  return render(
    <Form
      title="test form"
      scope={scope}
      inputs={
        scope === "login"
          ? (basicInputs as AuthInputConfig[])
          : ([
              ...basicInputs,
              { name: "passwordConfirmation", label: "confirm password" }
            ] as AuthInputConfig[])
      }
      onSubmit={handleSubmit}
    />
  );
};

beforeEach(() => jest.clearAllMocks());

describe("auth form component", () => {
  test("login shows error message with wrong credentials", async () => {
    (handleSubmit as jest.Mock).mockReturnValueOnce(fakeResponse);
    const { getByText, getByLabelText, getByDisplayValue } = renderComponent(
      "login"
    );
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText(/password/i);
    const button = screen.getByRole("button");

    userEvent.type(usernameInput, "UserNotRegistered");
    userEvent.type(passwordInput, "password");
    getByDisplayValue("UserNotRegistered");
    getByDisplayValue("password");
    userEvent.click(button);
    await wait(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    await wait(() =>
      expect(handleSubmit).toHaveBeenCalledWith("login", {
        username: "UserNotRegistered",
        password: "password"
      })
    );
    await wait(() =>
      expect(getByText("Wrong username or password. Try again!"))
    );
  });
});

describe("register component", () => {
  test("component shows error if username is too short", async () => {
    const registrationResponse = {
      status: "failure",
      message: null,
      error: "Please use a username longer than 3 characters",
      payload: null
    };

    (handleSubmit as jest.Mock).mockReturnValueOnce(registrationResponse);
    const { getByText, getByLabelText } = renderComponent("register");
    const usernameInput = getByLabelText(/username/i);
    const passwordInput = getByLabelText("password");
    const passwordConfirmationInput = getByLabelText("confirm password");
    const button = getByText(/join/i);

    userEvent.type(usernameInput, "abc");
    userEvent.type(passwordInput, "password");
    userEvent.type(passwordConfirmationInput, "password");
    userEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith("register", {
      username: "abc",
      password: "password",
      passwordConfirmation: "password"
    });
    await wait(() =>
      getByText("Please use a username longer than 3 characters")
    );
  });
});
