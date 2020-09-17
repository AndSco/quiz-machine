import axios from "axios";
import {
  LoginFormInputs,
  RegistrationFormInputs
} from "../reducers/AuthReducers";
import { apiEndPoints } from "../constants/apiEndpoints";
import { PrivateQuiz } from "../models/PrivateQuiz";

export const loginUser = async (inputValues: LoginFormInputs) => {
  try {
    const { username, password } = inputValues;
    const response = await axios.post(apiEndPoints.LOGIN, {
      username,
      password
    });
    console.log("RES", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const registerUser = async (inputValues: RegistrationFormInputs) => {
  try {
    const { username, password } = inputValues;
    const response = await axios.post(apiEndPoints.REGISTER, {
      username,
      password
    });
    console.log("RES", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const createQuiz = async (quiz: PrivateQuiz, userId: string) => {
  try {
    const response = await axios.post(apiEndPoints.QUIZ, {
      quiz,
      createdBy: userId
    });
    console.log("QUIZ CREATION RESPONSE", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
