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
        // default:
        //   "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    questions: [
        {
            question: {
                type: String,
                required: true
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
        type: String
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.Quiz = mongoose_1.model("Quiz", quizSchema);
