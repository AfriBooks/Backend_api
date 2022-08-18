"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.userRoute = void 0;
var passport_1 = __importDefault(require("passport"));
var user_1 = require("../controllers/user");
var userRoute = function (app) {
    app.post("/user", user_1.createUser);
    app.post("/login", user_1.authenticate);
    app.get("/users", user_1.getUser);
    app.get("/users/:id", user_1.getSingleUser);
    app["delete"]("/user/:id");
    app.get('/google', passport_1["default"].authenticate('google'));
};
exports.userRoute = userRoute;
