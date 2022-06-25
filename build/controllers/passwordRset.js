"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPass = exports.forgotPass = void 0;
const joi_1 = __importDefault(require("joi"));
const crypto_1 = __importDefault(require("crypto"));
const user_1 = __importDefault(require("../models/user"));
const tokens_1 = require("../models/tokens");
const sendEmail_1 = require("../utils/sendEmail");
const forgotPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = joi_1.default.object({ email: joi_1.default.string().email().required() });
        const { error } = result.validate(req.body);
        if (error)
            return res.json({
                status: "error",
                error: "Enter a valid email",
            });
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.json({
                status: "error",
                error: "This email does not exist",
            });
        let token = yield tokens_1.tokens.findOne({ userId: user.id });
        if (!token) {
            token = yield new tokens_1.tokens({
                userId: user.id,
                token: crypto_1.default.randomBytes(32).toString("hex"),
            }).save();
        }
        const link = `${process.env.BASE_URL}/resetPass/${user.id}/${token.token}`;
        yield (0, sendEmail_1.resetMail)(user.email, "password reset", link);
        res.json({
            status: "200",
            success: "password reset link sent to your email account",
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.forgotPass = forgotPass;
const resetPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = joi_1.default.object({ password: joi_1.default.string().required() });
        const { error } = result.validate(req.body);
        if (error)
            return res.json({
                status: 400,
                error: "invalid password format",
            });
        const user = yield user_1.default.findById(req.params.userId);
        if (!user)
            return res.json({
                status: 400,
                error: "invalid link or expired",
            });
        const token = yield tokens_1.tokens.findOne({
            userId: user.id,
            toking: req.params.token,
        });
        if (!token)
            return res.json({
                status: 400,
                error: "invalid link or expired",
            });
        user.password = req.body.password;
        yield user.save();
        yield token.delete();
        return res.json({
            status: 200,
            error: "password reset successfully",
        });
    }
    catch (error) {
        res.json({
            status: 400,
            error: "something went wrong",
        });
    }
});
exports.resetPass = resetPass;
