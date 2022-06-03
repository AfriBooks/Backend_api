"use strict";
exports.__esModule = true;
var book_1 = require("../handlers/book");
var user_1 = require("../handlers/user");
var testUserRoutes = function (app) {
    app.get("/users", user_1.getUsers);
    app.post("/users", user_1.create);
    app.post('/login', user_1.login);
    app.get('/users/:id/books', book_1.getBooksByUser);
};
exports["default"] = testUserRoutes;
