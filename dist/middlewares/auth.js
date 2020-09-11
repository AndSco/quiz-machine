"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMiddleware = void 0;
var passport_1 = __importDefault(require("passport"));
exports.authenticateMiddleware = function () {
    return passport_1.default.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    });
};
