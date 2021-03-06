import { Request, Response } from "express";
import { CLOUDINARY_CONFIG } from "../conn_string";
const cloudinary = require("cloudinary").v2;
import Book from "../models/book";

cloudinary.config(CLOUDINARY_CONFIG);

export const addBook = async (req: Request, res: Response) => {
    const user = req.cookies.afribook_currentUser;
    const filesArray = req.files;
    let file = filesArray
        ? filesArray.length > 0
            ? //@ts-ignore
              filesArray[0].path
            : ""
        : "";

    let fileName = "";

    await cloudinary.uploader
        .upload(file)
        .then((result: any) => {
            console.log(result);
            fileName += result.secure_url;
        })
        .catch((error: any) => {
            return console.log("failure", error);
        });

    const new_book = {
        title: req.body.title,
        author: req.body.author,
        cover: fileName,
        price: req.body.price,
        description: req.body.description,
        genre: req.body.genre,
        created_by: user._id,
    };
    try {
        const findDuplicate = await Book.findOne({ title: new_book.title });
        if (findDuplicate) {
            return res
                .status(400)
                .json({ message: "A book with that title already exists" });
        }
        await Book.create(new_book)
            .then((response) => {
                res.status(201).json(response);
            })
            .catch((err) => console.error(err));
    } catch (err) {
        console.error(err);
    }
};

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find({});
        if (!books.length) {
            return res
                .status(202)
                .json({ message: "No books in the database" });
        }
        const number_of_books = books.length;
        return res.status(200).json({ total: number_of_books, books });
    } catch (error) {
        console.error(error);
    }
};

export const getSingleBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(202).json({
                message: "No book with that id found",
            });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
    }
};

export const getBooksByCategories = async (req: Request, res: Response) => {
    const category = req.params.category.toLowerCase();
    try {
        await Book.find({})
            .then((result) => {
                let categories = [];
                for (let book in result) {
                    if (result[book].genre.toLowerCase() === category) {
                        categories.push(result[book]);
                    }
                }
                res.status(200).json(categories);
            })
            .catch((error) => {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
};

// to be moved to user handler
export const getBooksByUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const books = await Book.find({ created_by: id });
        if (!books) {
            return res.status(400).json("No books created by this user");
        }
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.cookies.afribook_currentUser;

    if (!user) {
        return res.status(400).json("User must be logged in");
    }

    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(400).json({ message: "No book with that id" });
        }
        // if (user.isAdmin !== true || user.id != book.created_by) {
        //     return res
        //         .status(400)
        //         .json("You can only delete books posted by you");
        // }
        await Book.findByIdAndDelete(id)
            .then((result) => {
                res.status(200).json({ message: "Book deleted successfully" });
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({ message: "Could not delete book" });
            });
    } catch (error) {
        console.error(error);
    }
};

export const updateBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.cookies.afribook_currentUser;

    if (!user) {
        return res.status(400).json("User must be logged in");
    }
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(400).json({ message: "No book with that id" });
        }

        if (book.created_by !== user.id) {
            return res
                .status(400)
                .json("You can only update books posted by you");
        }
        Book.findByIdAndUpdate(id, req.body, { new: true })
            .then((result) => {
                res.status(201).json({ message: "Book updated", result });
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({ message: "Could not update book" });
            });
    } catch (error) {
        console.error(error);
    }
};

export const review = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const review = req.body.review;
    const user = req.cookies.afribook_currentUser;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(400).json({ message: "No book with that id" });
        }
        let reviewsArray = book.reviews;
        const data = {
            username: user.name,
            review,
        };
        reviewsArray.push(data);

        Book.findByIdAndUpdate(bookId, { reviews: reviewsArray }, { new: true })
            .then((result) => {
                res.status(201).json({ message: "Review added", result });
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({ message: "Could not add book review" });
            });
    } catch (error) {
        console.error(error);
    }
};

export const reviewReply = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const reviewId = req.params.reviewId;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(400).json("No book with that Id");
        }

        const replyObject = {
            userId: "62965153a11319e48a41110a",
            reply: req.body.reply,
        };

        Book.findByIdAndUpdate(
            bookId,
            { $push: { "reviews.$[reviews].replies": replyObject } },
            {
                arrayFilters: [
                    {
                        "reviews._id": reviewId,
                    },
                ],
            }
        )
            .then((result) => {
                res.status(200).json({ message: "Reply added", replyObject });
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json("Could not add reply");
            });
    } catch (error) {
        console.error(error);
    }
};

export const getBookReviews = async (req: Request, res: Response) => {
    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(400).json({ message: "No book with that id" });
        }
        const reviews = book.reviews;
        if (reviews.length <= 0) {
            return res
                .status(400)
                .json({ message: "This book has no reviews yet" });
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
    }
};
