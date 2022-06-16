"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var replySchema = new mongoose_1.Schema({
    userId: String,
    reply: Object
}, { _id: false });
var reviewSchema = new mongoose_1.Schema({
    user: Object,
    review: String,
    replies: [replySchema]
});
var bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    cover: { type: String, trim: true },
    price: { type: Number, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    genre: { type: String, trim: true, lowercase: true },
    created_by: { type: String, required: true, trim: true },
    reviews: [reviewSchema]
}, { timestamps: true });
var Book = (0, mongoose_1.model)("Book", bookSchema);
exports["default"] = Book;
