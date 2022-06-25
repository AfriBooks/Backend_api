"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.uploadFile = void 0;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1["default"].memoryStorage();
exports.uploadFile = (0, multer_1["default"])({ storage: storage }).any();
