"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = require("../config");
mongoose_1.default.set("debug", true);
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.Promise = Promise; // allows us to do without CALLBACKS!
var connectionString = config_1.mongoConnection;
exports.connectToDatabase = function () {
    mongoose_1.default.connect(connectionString, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function (err) {
        if (err) {
            console.error(err);
            throw new Error(err.message);
        }
        else {
            console.log("Database connected!");
        }
    });
};
