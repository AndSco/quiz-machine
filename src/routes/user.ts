import { Router } from "express";
import { getUserQuizzes } from "../handlers/user";

const router = Router();

router.get("/:userId", getUserQuizzes);

export default router;
