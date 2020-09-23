"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importStar(require("body-parser"));
var path_1 = __importDefault(require("path"));
var dbConnection_1 = require("./handlers/dbConnection");
var user_1 = __importDefault(require("./routes/user"));
var quiz_1 = __importDefault(require("./routes/quiz"));
var auth_1 = __importDefault(require("./routes/auth"));
var passport_1 = __importDefault(require("passport"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var config_1 = require("./config");
var passport_config_1 = require("./passport-config");
var app = express_1.default();
//Body-parser
app.use(body_parser_1.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Cors
app.use(cors_1.default({
    origin: "http://localhost/300",
    credentials: true
}));
// Session
app.use(express_session_1.default({
    secret: config_1.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
// Cookie-parser
app.use(cookie_parser_1.default(config_1.sessionSecret));
// Passport
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_config_1.initialisePassport(passport_1.default);
// Routes
app.use("/api/user", user_1.default);
app.use("/api/quiz", quiz_1.default);
app.use("/api/auth", auth_1.default);
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
