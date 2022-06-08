import { Application } from "express";
import { verifyAuthToken } from "../auth/verifyAuth";
import {
    addBook,
    deleteBook,
    getBookReviews,
    getBooks,
    getBooksByCategories,
    getSingleBook,
    review,
    reviewReply,
    updateBook,
} from "../controllers/book";
import { uploadImg } from "../middleware/upload";

const bookRoutes = (app: Application) => {
    app.get("/books", getBooks);
    app.post("/books", verifyAuthToken, uploadImg, addBook);
    app.get("/books/:id", getSingleBook);
    app.get("/books/categories/:category", getBooksByCategories);
    app.delete("/books/:id", verifyAuthToken, deleteBook);
    app.patch("/books/:id", verifyAuthToken, updateBook);
    app.patch("/books/:id/reviews",verifyAuthToken, review);
    app.patch("/books/:id/reviews/:reviewId/reply", verifyAuthToken, reviewReply);
    app.get("/books/:id/reviews", getBookReviews);
};

export default bookRoutes;
