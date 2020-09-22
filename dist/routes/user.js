"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../handlers/user");
var router = express_1.Router();
router.get("/:userId", user_1.getUserQuizzes);
exports.default = router;
