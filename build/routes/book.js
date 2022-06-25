"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAuth_1 = require("../auth/verifyAuth");
const book_1 = require("../controllers/book");
const bookRoutes = (app) => {
    app.get("/books", book_1.getBooks);
    app.post("/books", verifyAuth_1.verifyAuthToken, book_1.addBook);
    app.get("/books/:id", book_1.getSingleBook);
    app.get("/books/categories/:category", book_1.getBooksByCategories);
    app.delete("/books/:id", verifyAuth_1.verifyAuthToken, book_1.deleteBook);
    app.patch("/books/:id", verifyAuth_1.verifyAuthToken, book_1.updateBook);
    app.patch("/books/:id/reviews", verifyAuth_1.verifyAuthToken, book_1.review);
    app.patch("/books/:id/reviews/:reviewId/reply", verifyAuth_1.verifyAuthToken, book_1.reviewReply);
    app.get("/books/:id/reviews", book_1.getBookReviews);
};
exports.default = bookRoutes;
