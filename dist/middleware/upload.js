"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.uploadImg = void 0;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.uploadImg = (0, multer_1["default"])({ storage: storage }).any();
