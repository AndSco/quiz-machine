import { Router } from "express";
import {
  createQuiz,
  getSingleQuiz,
  getAllPublicQuizzes
} from "../handlers/quiz";

const router = Router();

router.get("/", getAllPublicQuizzes);
router.post("/", createQuiz);
router.get("/:quizId", getSingleQuiz);

export default router;
