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
exports.deleteUser = exports.getSingleUser = exports.getUser = exports.authenticate = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const addUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    try {
        //const passD=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
        if (addUser.password.length < 8) {
            return res.json({
                status: "error",
                error: "Password should be at least 8 characters",
            });
        }
        const emailCheck = yield user_1.default.findOne({
            $or: [{ email: addUser.email }],
        });
        if (emailCheck) {
            return res.status(400).json({
                message: "This Email is already in use, please confirm the email or request retrieve password",
            });
        }
        const newUser = yield user_1.default.create(addUser);
        res.json(newUser);
        res.status(201);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.createUser = createUser;
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        };
        const existingUser = yield user_1.default.findOne({ email: user.email });
        if (existingUser) {
            res.cookie("afribook_currentUser", existingUser);
            const token = jsonwebtoken_1.default.sign({ payload: existingUser }, `${process.env.TOKEN_SECRET}`, { expiresIn: "2h" });
            res.cookie("auth_token", token);
            res.json(token);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400);
        res.json(error);
    }
});
exports.authenticate = authenticate;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({});
        if (!users.length) {
            return res.json({
                status: 202,
                error: "No user in the database",
            });
        }
        const allUsers = users.length;
        res.json({ total: allUsers, users });
        res.status(200);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.getUser = getUser;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield user_1.default.findById(id);
        if (!user) {
            return res.json({
                status: 202,
                error: "No user with that id",
            });
        }
        res.json(user);
        res.status(200);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
exports.getSingleUser = getSingleUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteUser = deleteUser;
