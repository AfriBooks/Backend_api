"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyAuthToken = (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        jsonwebtoken_1.default.verify(token, `${process.env.TOKEN_SECRET}`);
    }
    catch (error) {
        res.status(401);
        return res.json({ message: "User authentication failed, invalid token" });
    }
    next();
};
exports.verifyAuthToken = verifyAuthToken;
