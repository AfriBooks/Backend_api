"use strict";
exports.__esModule = true;
exports.userRoute = void 0;
var user_1 = require("../controllers/user");
var userRoute = function (app) {
    app.post("/user", user_1.createUser);
    app.post("/login", user_1.authenticate);
    app.get("/users", user_1.getUser);
    app.get("/user/:id", user_1.getSingleUser);
    app["delete"]("/user/:id");
};
exports.userRoute = userRoute;
