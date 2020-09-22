import { Router } from "express";
import {
  createQuiz,
  getSingleQuiz,
  getAllPublicQuizzes,
  deleteQuiz,
  editQuiz
} from "../handlers/quiz";

const router = Router();

router.get("/", getAllPublicQuizzes);
router.post("/", createQuiz);
router.get("/:quizId", getSingleQuiz);
router.delete("/:quizId", deleteQuiz);
router.patch("/:quizId", editQuiz);

export default router;
