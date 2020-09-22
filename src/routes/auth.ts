import { Router } from "express";
import { registerUser, loginUser } from "../handlers/auth";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
