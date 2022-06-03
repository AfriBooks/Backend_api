import { model, Schema } from "mongoose";

type Book = {
    title: string;
    author: string;
    cover: string;
    price: number;
    description: string;
    categories: Array<string>;
    created_by: string;
    reviews: Array<object>;
};

type Reply = {
    userId: string;
    reply: string;
};

type Review = {
    user: object;
    review: string;
    replies?: Array<object>;
};

const replySchema = new Schema<Reply>(
    {
        userId: String,
        reply: Object,
    },
    { _id: false }
);

const reviewSchema = new Schema<Review>({
    user: Object,
    review: String,
    replies: [replySchema],
});

const bookSchema = new Schema<Book>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        cover: { type: String, trim: true },
        price: { type: Number, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        categories: [{ type: String, trim: true, lowercase: true }],
        created_by: { type: String, required: true, trim: true },
        reviews: [reviewSchema],
    },
    { timestamps: true }
);

const Book = model("Book", bookSchema);

export default Book;
