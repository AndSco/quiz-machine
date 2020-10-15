import "regenerator-runtime/runtime";
import { setupDb } from "../../db-tests-setup";
import { SEEDED_USERNAME } from "../../handlers/dbConnection";
import { User, iUser } from "../../models/user";
import { app } from "../../app";
import supertest from "supertest";
import { createQuiz, fakeQuiz } from "./quiz.test";

setupDb("user-tests", true);

const request = supertest(app);

export const getSeededUserId = async () => {
  const seededDbUser: any = await User.findOne({ username: SEEDED_USERNAME });
  const { _id: seededUserId } = (await seededDbUser) as iUser;
  return seededUserId;
};

test("it sends back all quizzes of a user", async () => {
  const seededUserId = await getSeededUserId();
  const response = await request.get(`/api/user/${seededUserId}`);

  expect(response.status).toBe(200);
  expect(response.body.message).toMatch(/User quizzes/);
  expect(response.body.payload.length).toBe(0);
});
