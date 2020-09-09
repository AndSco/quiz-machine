"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../handlers/user");
var router = express_1.Router();
router.post("/", user_1.createUser);
exports.default = router;
