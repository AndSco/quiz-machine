"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
var mongoose_1 = require("mongoose");
var quizSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    backgroundImageUrl: {
        type: String,
        required: true
    },
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            code: {
                type: String,
                default: ""
            },
            allReplies: [],
            rightReply: {
                type: String,
                required: true
            },
            explanation: {
                type: String
            }
        }
    ],
    createdBy: {
        // type: String
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.Quiz = mongoose_1.model("Quiz", quizSchema);
