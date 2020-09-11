import { Router } from "express";
import { registerUser, loginUser } from "../handlers/auth";
import passport from "passport";

const router = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
