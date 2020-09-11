"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../handlers/auth");
var router = express_1.Router();
router.post("/login", auth_1.loginUser);
router.post("/register", auth_1.registerUser);
exports.default = router;
