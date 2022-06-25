"use strict";
exports.__esModule = true;
var verifyAuth_1 = require("../auth/verifyAuth");
var book_1 = require("../controllers/book");
var upload_1 = require("../middleware/upload");
var bookRoutes = function (app) {
    app.get("/books", book_1.getBooks);
    app.post("/books", upload_1.uploadImg, book_1.addBook);
    app.get("/books/:id", book_1.getSingleBook);
    app.get("/books/categories/:category", book_1.getBooksByCategories);
    app["delete"]("/books/:id", verifyAuth_1.verifyAuthToken, book_1.deleteBook);
    app.patch("/books/:id", verifyAuth_1.verifyAuthToken, book_1.updateBook);
    app.patch("/books/:id/reviews", verifyAuth_1.verifyAuthToken, book_1.review);
    app.patch("/books/:id/reviews/:reviewId/reply", verifyAuth_1.verifyAuthToken, book_1.reviewReply);
    app.get("/books/:id/reviews", book_1.getBookReviews);
};
exports["default"] = bookRoutes;
