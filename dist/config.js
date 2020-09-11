"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSecret = exports.mongoConnection = void 0;
var path_1 = require("path");
var dotenv_1 = require("dotenv");
dotenv_1.config({ path: path_1.resolve(__dirname, "../.env") });
exports.mongoConnection = process.env.MONGO_CONNECTION;
exports.sessionSecret = process.env.SESSION_SECRET;
