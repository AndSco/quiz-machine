"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    quizzes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Quiz"
        }
    ]
});
// userSchema.plugin(passportLocalMongoose);
exports.User = mongoose_1.model("User", userSchema);
