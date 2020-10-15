import "regenerator-runtime/runtime";
import { setupDb } from "../../db-tests-setup";
import { SEEDED_USERNAME } from "../../handlers/dbConnection";
import { User, iUser } from "../../models/user";
import { iQuiz, Quiz } from "../../models/quiz";
import { app } from "../../app";
import supertest from "supertest";
import { response } from "express";

const request = supertest(app);

setupDb("quiz-tests", true);

const fakeQuiz: Partial<iQuiz> = {
  title: "fakeQuiz",
  isPrivate: false,
  questions: [
    {
      question: "Question1",
      allReplies: ["True", "False"],
      rightReply: "True"
    }
  ],
  backgroundImageUrl: "testImage.com"
};

const updatedFakeQuiz = {
  ...fakeQuiz,
  title: "Updated Quiz"
};

const createQuiz = async () => {
  const seededDbUser: any = await User.findOne({ username: SEEDED_USERNAME });
  const { _id: seededUserId } = seededDbUser as iUser;

  await request.post("/api/quiz").send({
    quiz: fakeQuiz,
    createdBy: seededUserId
  });

  const quiz = await Quiz.findOne({ title: "fakeQuiz" });
  const quizId = (quiz as iQuiz)._id;
  return quizId;
};

describe("quiz endpoints", () => {
  test("it creates a quiz", async () => {
    const seededDbUser: any = await User.findOne({ username: SEEDED_USERNAME });
    const { _id: seededUserId } = seededDbUser as iUser;

    const response = await request.post("/api/quiz").send({
      quiz: fakeQuiz,
      createdBy: seededUserId
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Quiz created/);

    const updatedUser: any = await User.findById(seededUserId);
    expect(updatedUser.quizzes.length).toBe(1);
    const createdQuizId = updatedUser.quizzes;
    const quizUploaded = await Quiz.findById(createdQuizId);
    expect(quizUploaded).toHaveProperty("title", "fakeQuiz");
  });

  test("it returns a 500 error if no quiz creator is found", async () => {
    const response = await request.post("/api/quiz").send({
      quiz: fakeQuiz,
      createdBy: "userNotInDB"
    });

    expect(response.status).toBe(500);
    expect(response.text).toMatch(/something went wrong/);
  });

  test("it fetches all public quizzes saved by users", async () => {
    await createQuiz();
    const response = await request.get("/api/quiz");

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch("All quizzes");
    expect(response.body.payload.length).toBe(1);
  });

  test("it returns a single quiz when searched by id", async () => {
    const quizId = await createQuiz();
    const response = await request.get(`/api/quiz/${quizId}`);

    expect(response.status).toBe(200);
    console.log("body", response.body);
    expect(response.body).not.toBeUndefined();
    expect(response.body.title).toMatch(/fakeQuiz/);
    expect(response.body.isPrivate).toBe(false);
  });

  test("it deletes a quiz by id", async () => {
    const quizId = await createQuiz();
    const response = await request.delete(`/api/quiz/${quizId}`);

    expect(response.status).toBe(200);
    expect(response.text).toMatch(/QUIZ DELETED/);
    const publicQuizzesLeftResponse = await request.get("/api/quiz");
    expect(publicQuizzesLeftResponse.status).toBe(200);
    expect(publicQuizzesLeftResponse.body.payload.length).toBe(0);
  });

  test("it updates a quiz correctly", async () => {
    const quizId = await createQuiz();
    const response = await request
      .patch(`/api/quiz/${quizId}`)
      .send({ updatedQuiz: updatedFakeQuiz });

    expect(response.status).toBe(200);
    expect(response.text).toMatch(/QUIZ UPDATED/);

    const updatedQuiz = await Quiz.findOne({ title: "Updated Quiz" });
    expect(updatedQuiz).toBeTruthy();
  });
});
