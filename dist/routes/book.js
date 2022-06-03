"use strict";
exports.__esModule = true;
var book_1 = require("../handlers/book");
var bookRoutes = function (app) {
    app.get("/books", book_1.getBooks);
    app.post("/books", book_1.addBook);
    app.get("/books/:id", book_1.getSingleBook);
    app.get("/books/categories/:category", book_1.getBooksByCategories);
    app["delete"]("/books/:id", book_1.deleteBook);
    app.patch("/books/:id", book_1.updateBook);
    app.patch("/books/:id/reviews", book_1.review);
    app.patch("/books/:id/reviews/:reviewId/reply", book_1.reviewReply);
};
exports["default"] = bookRoutes;
