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
exports.googleHandler = exports.deleteUser = exports.getSingleUser = exports.getUser = exports.authenticate = exports.createUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var user_1 = __importDefault(require("../models/user"));
// import { findAndUpdateUser, getGoogleOauthTokens, getGoogleUser } from "../service/user.service";
dotenv_1["default"].config();
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var addUser, emailCheck, newUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                addUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                //const passD=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
                if (addUser.password.length < 8) {
                    return [2 /*return*/, res.json({
                            status: "error",
                            error: "Password should be at least 8 characters"
                        })];
                }
                return [4 /*yield*/, user_1["default"].findOne({
                        $or: [{ email: addUser.email }]
                    })];
            case 2:
                emailCheck = _a.sent();
                if (emailCheck) {
                    return [2 /*return*/, res.status(400).json({
                            message: "This Email is already in use, please confirm the email or request retrieve password"
                        })];
                }
                return [4 /*yield*/, user_1["default"].create(addUser)];
            case 3:
                newUser = _a.sent();
                res.json(newUser);
                res.status(201);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(400);
                res.json(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, existingUser, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    email: req.body.email,
                    password: req.body.password
                };
                return [4 /*yield*/, user_1["default"].findOne({ email: user.email })];
            case 1:
                existingUser = _a.sent();
                if (existingUser) {
                    res.cookie("afribook_currentUser", existingUser);
                    token = jsonwebtoken_1["default"].sign({ payload: existingUser }, "".concat(process.env.TOKEN_SECRET), { expiresIn: "2h" });
                    res.cookie("auth_token", token);
                    res.status(200).json({ token: token, name: existingUser.name });
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(400);
                res.json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authenticate = authenticate;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, allUsers, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1["default"].find({})];
            case 1:
                users = _a.sent();
                if (!users.length) {
                    return [2 /*return*/, res.json({
                            status: 202,
                            error: "No user in the database"
                        })];
                }
                allUsers = users.length;
                res.json({ total: allUsers, users: users });
                res.status(200);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400);
                res.json(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var getSingleUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1["default"].findById(id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.json({
                            status: 202,
                            error: "No user with that id"
                        })];
                }
                res.json(user);
                res.status(200);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(400);
                res.json(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSingleUser = getSingleUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.deleteUser = deleteUser;
var googleHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        code = req.query.code;
        return [2 /*return*/];
    });
}); };
exports.googleHandler = googleHandler;
