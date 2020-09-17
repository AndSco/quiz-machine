"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var quiz_1 = require("../handlers/quiz");
var router = express_1.Router();
router.get("/", quiz_1.getAllPublicQuizzes);
router.post("/", quiz_1.createQuiz);
router.get("/:quizId", quiz_1.getSingleQuiz);
exports.default = router;
