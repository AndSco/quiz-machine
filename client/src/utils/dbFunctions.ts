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

export const getSingleQuiz = async (quizId: string) => {
  try {
    const response = await axios.get(`${apiEndPoints.QUIZ}/${quizId}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getCustomUsersQuizzes = async () => {
  try {
    const response = await axios.get(`${apiEndPoints.QUIZ}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteQuiz = async (quizId: string) => {
  try {
    const response = await axios.delete(`${apiEndPoints.QUIZ}/${quizId}`);
    console.log("DELETED?", response.data);
  } catch (err) {
    console.error(err);
  }
};

export const editQuiz = async (quizId: string, updatedQuiz: PrivateQuiz) => {
  try {
    const response = await axios.patch(`${apiEndPoints.QUIZ}/${quizId}`, {
      updatedQuiz
    });
    console.log("EDITED?", response.data);
  } catch (err) {
    console.error(err);
  }
};

export const getUserQuizzes = async (userId: string) => {
  try {
    const response = await axios.get(`${apiEndPoints.USER}/${userId}`);
    const userQuizzes = response.data.payload;
    console.log("USER QUIZZES", userQuizzes);
    return userQuizzes;
  } catch (err) {
    console.error(err);
  }
};
