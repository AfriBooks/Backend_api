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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.reviewReply = exports.review = exports.updateBook = exports.deleteBook = exports.getBooksByUser = exports.getBooksByCategories = exports.getSingleBook = exports.getBooks = exports.addBook = void 0;
var book_1 = __importDefault(require("../models/book"));
// remaining
// - move getBooksByUser to user handler (after importing from Kelechi)
// - changed created_by to get user id from auth data (after kelechi)
// - delete book (poster)
// - delete any book (admin)
// - post review
// - post reply to review
// - image upload (multer?)
// modify get user (from req.cookies) according to how kelechi's login stores the user
// & store in global variable
// then change it for all the endpoints that uses user
// TIP - delete
// store user credentials in the session
// create middleware to get current user object from session
// check if user is admin
// if isAdmin - proceed to delete any book
// else - stop function, can not delete this book || can delete books posted by self
var addBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var new_book, findDuplicate, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                new_book = {
                    title: req.body.title,
                    author: req.body.author,
                    cover: req.body.cover,
                    price: req.body.price,
                    description: req.body.description,
                    categories: req.body.categories,
                    created_by: req.body.userId
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, book_1["default"].findOne({ title: new_book.title })];
            case 2:
                findDuplicate = _a.sent();
                if (findDuplicate) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "A book with that title already exists" })];
                }
                return [4 /*yield*/, book_1["default"].create(new_book)
                        .then(function (response) {
                        res.status(201).json(response);
                    })["catch"](function (err) { return console.error(err); })];
            case 3:
                _a.sent();
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addBook = addBook;
var getBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, number_of_books, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, book_1["default"].find({})];
            case 1:
                books = _a.sent();
                if (!books.length) {
                    return [2 /*return*/, res
                            .status(202)
                            .json({ message: "No books in the database" })];
                }
                number_of_books = books.length;
                return [2 /*return*/, res.status(200).json({ total: number_of_books, books: books })];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBooks = getBooks;
var getSingleBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book_1["default"].findById(id)];
            case 2:
                book = _a.sent();
                if (!book) {
                    return [2 /*return*/, res.status(202).json({
                            message: "No book with that id found"
                        })];
                }
                res.status(200).json(book);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSingleBook = getSingleBook;
var getBooksByCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, books, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                category = req.params.category;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book_1["default"].find({ categories: category })];
            case 2:
                books = _a.sent();
                if (!books.length) {
                    return [2 /*return*/, res
                            .status(202)
                            .json({ message: "No books in that category" })];
                }
                res.status(200).json(books);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getBooksByCategories = getBooksByCategories;
// to be moved to user handler
var getBooksByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, books, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book_1["default"].find({ created_by: id })];
            case 2:
                books = _a.sent();
                if (!books) {
                    return [2 /*return*/, res.status(400).json("No books created by this user")];
                }
                res.status(200).json(books);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getBooksByUser = getBooksByUser;
var deleteBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book_1["default"].findByIdAndDelete(id)
                        .then(function (result) {
                        res.status(200).json({ message: "Book deleted successfully" });
                    })["catch"](function (err) {
                        console.error(err);
                        res.status(400).json({ message: "Could not delete book" });
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteBook = deleteBook;
var updateBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, book, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                user = req.cookies.auth_user;
                if (!user) {
                    return [2 /*return*/, res.status(400).json("User must be logged in")];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book_1["default"].findById(id)];
            case 2:
                book = _a.sent();
                if (!book) {
                    return [2 /*return*/, res.status(400).json({ message: "No book with that id" })];
                }
                if (book.created_by !== user.id) {
                    return [2 /*return*/, res
                            .status(400)
                            .json("You can only update books posted by you")];
                }
                book_1["default"].findByIdAndUpdate(id, req.body, { "new": true })
                    .then(function (result) {
                    res.status(201).json({ message: "Book updated", result: result });
                })["catch"](function (err) {
                    console.error(err);
                    res.status(400).json({ message: "Could not update book" });
                });
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateBook = updateBook;
var review = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookId, review, user, book, reviewsArray, data, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bookId = req.params.id;
                review = req.body.review;
                user = req.cookies.auth_user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book_1["default"].findById(bookId)];
            case 2:
                book = _a.sent();
                if (!book) {
                    return [2 /*return*/, res.status(400).json({ message: "No book with that id" })];
                }
                reviewsArray = book.reviews;
                data = {
                    user: user,
                    review: review
                };
                reviewsArray.push(data);
                book_1["default"].findByIdAndUpdate(bookId, { reviews: reviewsArray }, { "new": true })
                    .then(function (result) {
                    res.status(201).json({ message: "Review added", result: result });
                })["catch"](function (err) {
                    console.error(err);
                    res.status(400).json({ message: "Could not add book review" });
                });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.error(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.review = review;
var reviewReply = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookId, reviewId, book, replyObject_1, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bookId = req.params.id;
                reviewId = req.params.reviewId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, book_1["default"].findById(bookId)];
            case 2:
                book = _a.sent();
                if (!book) {
                    return [2 /*return*/, res.status(400).json("No book with that Id")];
                }
                replyObject_1 = {
                    userId: "62965153a11319e48a41110a",
                    reply: req.body.reply
                };
                book_1["default"].findByIdAndUpdate(bookId, { $push: { "reviews.$[reviews].replies": replyObject_1 } }, {
                    arrayFilters: [
                        {
                            "reviews._id": reviewId
                        },
                    ]
                })
                    .then(function (result) {
                    res.status(200).json({ message: "Reply added", replyObject: replyObject_1 });
                })["catch"](function (err) {
                    console.error(err);
                    res.status(400).json("Could not add reply");
                });
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.error(error_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.reviewReply = reviewReply;
