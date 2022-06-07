import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import User, { UserData } from "../models/user";

dotenv.config();

export const createUser = async (req: Request, res: Response) => {
    const addUser: UserData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    try {
        //const passD=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

        if (addUser.password.length < 8) {
            return res.json({
                status: "error",
                error: "Password should be at least 8 characters",
            });
        }

        const emailCheck = await User.findOne({
            $or: [{ email: addUser.email }],
        });
        if (emailCheck) {
            return res.status(400).json({
                message:
                    "This Email is already in use, please confirm the email or request retrieve password",
            });
        }
        const newUser = await User.create(addUser);
        res.json(newUser);
        res.status(201);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export const authenticate = async (req: Request, res: Response) => {
    try {
        const user = {
            email: req.body.email,
            password: req.body.password,
        };
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
            res.cookie("afribook_currentUser", existingUser);
            const token = jwt.sign(
                {
                    payload: existingUser,
                },
                //@ts-ignore
                `${process.env.TOKEN_SECRET}`,
                {
                    expiresIn: "2h",
                }
            );
            res.json(token);
        }
    } catch (error) {
        console.error(error);
        res.status(400);
        res.json(error);
    }
};
