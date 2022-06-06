import { Request, Response } from "express";
import User, { UserData } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  const addUser: UserData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // const passD=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

    if (addUser.password.length < 8) {
      return res.json({
        status: "error",
        error: "Password should be at least 8 characters",
      });
    }

    const searchDb = await User.findOne({ userName: addUser.email });
    if (searchDb) {
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
