"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleQuiz = exports.getAllPublicQuizzes = exports.createQuiz = void 0;
var quiz_1 = require("../models/quiz");
var user_1 = require("../models/user");
exports.createQuiz = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var response, _a, quiz, createdBy, newQuiz, quizCreator, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                response = void 0;
                _a = req.body, quiz = _a.quiz, createdBy = _a.createdBy;
                return [4 /*yield*/, quiz_1.Quiz.create(__assign(__assign({}, quiz), { createdBy: createdBy }))];
            case 1:
                newQuiz = _b.sent();
                return [4 /*yield*/, user_1.User.findById(createdBy)];
            case 2:
                quizCreator = _b.sent();
                if (!quizCreator || !newQuiz) {
                    response = {
                        message: "Something went wrong",
                        payload: null,
                        error: "Something went wrong"
                    };
                }
                else {
                    quizCreator.quizzes.push(newQuiz);
                    quizCreator.save();
                    response = {
                        message: "Quiz created",
                        payload: newQuiz,
                        error: null
                    };
                }
                res.status(200).json(response);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, next(err_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllPublicQuizzes = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var allQuizzes, response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, quiz_1.Quiz.find({})];
            case 1:
                allQuizzes = _a.sent();
                response = {
                    message: "All quizzes",
                    error: null,
                    payload: allQuizzes
                };
                return [2 /*return*/, res.status(200).json(response)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, next(err_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSingleQuiz = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var quizId, quiz, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                quizId = req.params.quizId;
                return [4 /*yield*/, quiz_1.Quiz.findById(quizId)];
            case 1:
                quiz = _a.sent();
                return [2 /*return*/, res.status(200).json(quiz)];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
