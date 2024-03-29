"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = require("dotenv");
var database_1 = __importDefault(require("./database"));
var book_1 = __importDefault(require("./routes/book"));
var user_1 = require("./routes/user");
var password_1 = require("./routes/password");
var dotenv_2 = __importDefault(require("dotenv"));
// require('./utils/google');
dotenv_2["default"].config();
(0, database_1["default"])()["catch"](function (err) { return console.error(err); });
var app = (0, express_1["default"])();
var port = process.env.PORT || 8080;
(0, dotenv_1.config)();
// app.use(passport.initialize());
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use((0, cookie_parser_1["default"])());
(0, book_1["default"])(app);
(0, user_1.userRoute)(app);
(0, password_1.passRoute)(app);
app.get("/", function (req, res) {
    res.status(200).send("Welcome to AfriBook API");
});
app.get("*", function (req, res) {
    res.status(404).send("This route does not exist");
});
app.listen(port, function () {
    console.log("App is listening on port ".concat(port));
});
exports["default"] = app;
