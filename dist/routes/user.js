"use strict";
exports.__esModule = true;
exports.userRoute = void 0;
var user_1 = require("../controllers/user");
var userRoute = function (app) {
    app.post("/user", user_1.createUser);
};
exports.userRoute = userRoute;
