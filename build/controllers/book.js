"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookReviews = exports.reviewReply = exports.review = exports.updateBook = exports.deleteBook = exports.getBooksByUser = exports.getBooksByCategories = exports.getSingleBook = exports.getBooks = exports.addBook = void 0;
const book_1 = __importDefault(require("../models/book"));
const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.cookies.afribook_currentUser;
    const filesArray = req.files;
    let file = filesArray
        ? filesArray.length > 0
            ? //@ts-ignore
                filesArray[0].path
            : ""
        : "";
    let image = filesArray
        ? filesArray.length > 0
            ? //@ts-ignore
                filesArray[0].buffer
            : ""
        : "";
    console.log(req.files);
    return res.json(file);
    const new_book = {
        title: req.body.title,
        author: req.body.author,
        cover: filesArray,
        price: req.body.price,
        description: req.body.description,
        genre: req.body.genre,
        created_by: user._id,
    };
    try {
        const findDuplicate = yield book_1.default.findOne({ title: new_book.title });
        if (findDuplicate) {
            return res
                .status(400)
                .json({ message: "A book with that title already exists" });
        }
        yield book_1.default.create(new_book)
            .then((response) => {
            res.status(201).json(response);
        })
            .catch((err) => console.error(err));
    }
    catch (err) {
        console.error(err);
    }
});
exports.addBook = addBook;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.find({});
        if (!books.length) {
            return res
                .status(202)
                .json({ message: "No books in the database" });
        }
        const number_of_books = books.length;
        return res.status(200).json({ total: number_of_books, books });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getBooks = getBooks;
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const book = yield book_1.default.findById(id);
        if (!book) {
            return res.status(202).json({
                message: "No book with that id found",
            });
        }
        res.status(200).json(book);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getSingleBook = getSingleBook;
const getBooksByCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    try {
        const books = yield book_1.default.find({ categories: category });
        if (!books.length) {
            return res
                .status(202)
                .json({ message: "No books in that category" });
        }
        res.status(200).json(books);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getBooksByCategories = getBooksByCategories;
// to be moved to user handler
const getBooksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const books = yield book_1.default.find({ created_by: id });
        if (!books) {
            return res.status(400).json("No books created by this user");
        }
        res.status(200).json(books);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getBooksByUser = getBooksByUser;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.cookies.afribook_currentUser;
    if (!user) {
        return res.status(400).json("User must be logged in");
    }
    try {
        const book = yield book_1.default.findById(id);
        if (!book) {
            return res.status(400).json({ message: "No book with that id" });
        }
        // if (user.isAdmin !== true || user.id != book.created_by) {
        //     return res
        //         .status(400)
        //         .json("You can only delete books posted by you");
        // }
        yield book_1.default.findByIdAndDelete(id)
            .then((result) => {
            res.status(200).json({ message: "Book deleted successfully" });
        })
            .catch((err) => {
            console.error(err);
            res.status(400).json({ message: "Could not delete book" });
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteBook = deleteBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.cookies.afribook_currentUser;
    if (!user) {
        return res.status(400).json("User must be logged in");
    }
    try {
        const book = yield book_1.default.findById(id);
        if (!book) {
            return res.status(400).json({ message: "No book with that id" });
        }
        if (book.created_by !== user.id) {
            return res
                .status(400)
                .json("You can only update books posted by you");
        }
        book_1.default.findByIdAndUpdate(id, req.body, { new: true })
            .then((result) => {
            res.status(201).json({ message: "Book updated", result });
        })
            .catch((err) => {
            console.error(err);
            res.status(400).json({ message: "Could not update book" });
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateBook = updateBook;
const review = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const review = req.body.review;
    const user = req.cookies.afribook_currentUser;
    try {
        const book = yield book_1.default.findById(bookId);
        if (!book) {
            return res.status(400).json({ message: "No book with that id" });
        }
        let reviewsArray = book.reviews;
        const data = {
            user,
            review,
        };
        reviewsArray.push(data);
        book_1.default.findByIdAndUpdate(bookId, { reviews: reviewsArray }, { new: true })
            .then((result) => {
            res.status(201).json({ message: "Review added", result });
        })
            .catch((err) => {
            console.error(err);
            res.status(400).json({ message: "Could not add book review" });
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.review = review;
const reviewReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const reviewId = req.params.reviewId;
    try {
        const book = yield book_1.default.findById(bookId);
        if (!book) {
            return res.status(400).json("No book with that Id");
        }
        const replyObject = {
            userId: "62965153a11319e48a41110a",
            reply: req.body.reply,
        };
        book_1.default.findByIdAndUpdate(bookId, { $push: { "reviews.$[reviews].replies": replyObject } }, {
            arrayFilters: [
                {
                    "reviews._id": reviewId,
                },
            ],
        })
            .then((result) => {
            res.status(200).json({ message: "Reply added", replyObject });
        })
            .catch((err) => {
            console.error(err);
            res.status(400).json("Could not add reply");
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.reviewReply = reviewReply;
const getBookReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    try {
        const book = yield book_1.default.findById(bookId);
        if (!book) {
            return res.status(400).json({ message: "No book with that id" });
        }
        const reviews = book.reviews;
        if (reviews.length <= 0) {
            return res.status(200).json("This book has no reviews yet");
        }
        res.json(reviews);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getBookReviews = getBookReviews;
