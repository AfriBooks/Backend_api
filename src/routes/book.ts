import { Application } from "express";
import { verifyAuthToken } from "../auth/verifyAuth";
import {
    addBook,
    deleteBook,
    getBookReviews,
    getBooks,
    getBooksByCategories,
    getBooksByUser,
    getSingleBook,
    review,
    reviewReply,
    updateBook,
} from "../controllers/book";
import { createOrder, getOrders, getOrdersByUser } from "../controllers/order";
import { uploadImg } from "../middleware/upload";

const bookRoutes = (app: Application) => {
    app.get("/books", getBooks);
    app.get("/user/orders", getOrders);
    app.post("/user/orders", createOrder);
    app.post("/books", uploadImg, addBook);
    app.get("/books/:id", getSingleBook);
    app.get("/books/categories/:category", getBooksByCategories);
    app.delete("/books/:id", verifyAuthToken, deleteBook);
    app.patch("/books/:id", verifyAuthToken, updateBook);
    app.patch("/books/:id/reviews", review);
    app.patch(
        "/books/:id/reviews/:reviewId/reply",
        verifyAuthToken,
        reviewReply
    );
    app.get("/books/:id/reviews", getBookReviews);
    app.get("/users/:id/books", getBooksByUser);
    app.get("/users/:id/orders", getOrdersByUser );
};

export default bookRoutes;
