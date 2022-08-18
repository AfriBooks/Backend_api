"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = require("dotenv");
const database_1 = __importDefault(require("./database"));
const book_1 = __importDefault(require("./routes/book"));
const user_1 = require("./routes/user");
const password_1 = require("./routes/password");
const dotenv_2 = __importDefault(require("dotenv"));
// require('./utils/google');
dotenv_2.default.config();
(0, database_1.default)().catch((err) => console.error(err));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
(0, dotenv_1.config)();
// app.use(passport.initialize());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
(0, book_1.default)(app);
(0, user_1.userRoute)(app);
(0, password_1.passRoute)(app);
app.get("/", (req, res) => {
    res.status(200).send("Welcome to AfriBook API");
});
app.get("*", (req, res) => {
    res.status(404).send("This route does not exist");
});
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
exports.default = app;
