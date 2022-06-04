import { Request, Response } from "express";
import User, { UserData } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  const addUser: UserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
  };

  try {
    if (addUser.password.length < 8) {
      return res.json({
        status: "error",
        error: "Password should be at least 6 characters",
      });
    }

    const searchDb = await User.findOne({ userName: addUser.userName });
    if (searchDb) {
      return res.status(400).json({
        message: "This User Name is already taken, please try something else",
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
