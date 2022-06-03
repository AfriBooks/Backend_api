import { Application } from "express";
import {
    addBook,
    deleteBook,
    getBooks,
    getBooksByCategories,
    getSingleBook,
    review,
    reviewReply,
    updateBook,
} from "../controllers/book";

const bookRoutes = (app: Application) => {
    app.get("/books", getBooks);
    app.post("/books", addBook);
    app.get("/books/:id", getSingleBook);
    app.get("/books/categories/:category", getBooksByCategories);
    app.delete("/books/:id", deleteBook);
    app.patch("/books/:id", updateBook);
    app.patch("/books/:id/reviews", review);
    app.patch("/books/:id/reviews/:reviewId/reply", reviewReply);
};

export default bookRoutes;
