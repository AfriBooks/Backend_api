"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const passport_1 = __importDefault(require("passport"));
const user_1 = require("../controllers/user");
const userRoute = (app) => {
    app.post("/user", user_1.createUser);
    app.post("/login", user_1.authenticate);
    app.get("/users", user_1.getUser);
    app.get("/user/:id", user_1.getSingleUser);
    app.delete("/user/:id");
    app.get('/google', passport_1.default.authenticate('google'));
};
exports.userRoute = userRoute;
