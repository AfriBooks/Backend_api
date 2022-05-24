"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to AfriBook API');
    res.status(200);
});
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
exports.default = app;
