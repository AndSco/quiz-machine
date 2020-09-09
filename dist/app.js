"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var body_parser_1 = require("body-parser");
var path_1 = __importDefault(require("path"));
var dbConnection_1 = require("./handlers/dbConnection");
var user_1 = __importDefault(require("./routes/user"));
var quiz_1 = __importDefault(require("./routes/quiz"));
app.use(body_parser_1.json());
app.use("/api/user", user_1.default);
app.use("/api/quiz", quiz_1.default);
// connect to DB
dbConnection_1.connectToDatabase();
// To serve both frontend and backend - catch ALL. Serve static assets only if in production.
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "/../client", "build")));
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.join(__dirname, "/../client", "build", "index.html"));
    });
}
app.use(function (error, req, res, next) {
    console.log("ERROR HANDLER", error.message);
    res.json({
        message: error.message || "Ooops, something went wrong!"
    });
});
var PORT = process.env.PORT || 8081;
app.listen(PORT, function () { return console.log("Server started on port " + PORT); });
