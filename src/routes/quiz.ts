import { Router } from "express";
import { createQuiz, getQuiz } from "../handlers/quiz";

const router = Router();

router.post("/", createQuiz);
router.get("/:quizId", getQuiz);

export default router;
