import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.auth_token;
        jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    } catch (error) {
        res.status(401);
        return res.json({ message: "User authentication failed, invalid token" });
    }
    next();
};
