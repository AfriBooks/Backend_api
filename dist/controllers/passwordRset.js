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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.resetPass = exports.forgotPass = void 0;
var joi_1 = __importDefault(require("joi"));
var crypto_1 = __importDefault(require("crypto"));
var user_1 = __importDefault(require("../models/user"));
var tokens_1 = require("../models/tokens");
var sendEmail_1 = require("../utils/sendEmail");
var forgotPass = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error, user, token, link, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                result = joi_1["default"].object({ email: joi_1["default"].string().email().required() });
                error = result.validate(req.body).error;
                if (error)
                    return [2 /*return*/, res.json({
                            status: "error",
                            error: "Enter a valid email"
                        })];
                return [4 /*yield*/, user_1["default"].findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.json({
                            status: "error",
                            error: "This email does not exist"
                        })];
                return [4 /*yield*/, tokens_1.tokens.findOne({ userId: user.id })];
            case 2:
                token = _a.sent();
                if (!!token) return [3 /*break*/, 4];
                return [4 /*yield*/, new tokens_1.tokens({
                        userId: user.id,
                        token: crypto_1["default"].randomBytes(32).toString("hex")
                    }).save()];
            case 3:
                token = _a.sent();
                _a.label = 4;
            case 4:
                link = "".concat(process.env.BASE_URL, "/resetPass/").concat(user.id, "/").concat(token.token);
                return [4 /*yield*/, (0, sendEmail_1.resetMail)(user.email, "password reset", link)];
            case 5:
                _a.sent();
                res.json({
                    status: "200",
                    success: "password reset link sent to your email account"
                });
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.forgotPass = forgotPass;
var resetPass = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error, user, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                result = joi_1["default"].object({ password: joi_1["default"].string().required() });
                error = result.validate(req.body).error;
                if (error)
                    return [2 /*return*/, res.json({
                            status: 400,
                            error: "invalid password format"
                        })];
                return [4 /*yield*/, user_1["default"].findById(req.params.userId)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.json({
                            status: 400,
                            error: "invalid link or expired"
                        })];
                return [4 /*yield*/, tokens_1.tokens.findOne({
                        userId: user.id,
                        toking: req.params.token
                    })];
            case 2:
                token = _a.sent();
                if (!token)
                    return [2 /*return*/, res.json({
                            status: 400,
                            error: "invalid link or expired"
                        })];
                user.password = req.body.password;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, token["delete"]()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.json({
                        status: 200,
                        error: "password reset successfully"
                    })];
            case 5:
                error_2 = _a.sent();
                res.json({
                    status: 400,
                    error: "something went wrong"
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.resetPass = resetPass;
