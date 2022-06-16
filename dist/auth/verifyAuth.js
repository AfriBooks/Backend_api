"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var verifyAuthToken = function (req, res, next) {
    try {
        var token = req.cookies.auth_token;
        jsonwebtoken_1["default"].verify(token, "".concat(process.env.TOKEN_SECRET));
    }
    catch (error) {
        res.status(401);
        return res.json({ message: "User authentication failed, invalid token" });
    }
    next();
};
exports.verifyAuthToken = verifyAuthToken;
