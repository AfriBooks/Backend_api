import { Request, Response } from "express";
import User, { UserData } from "../models/user";

/*
- Analysts
- Script reading databases

Cook- Developer
Salt, Pepper, Oil, - Password

bcrypt, md5, shall, sha256, sha512...

1. The collision should be improbable
2. The algorithm should be slow..

Special function(password) -> 32lkdnlnawonjsdjkc

Hashing the password
*/



export const createUser = async (req: Request, res: Response) => {
  
  const addUser: UserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
  };

  try {
    const searchDb = await User.findOne({ userName: addUser.userName });
    if (searchDb) {
      return res
        .status(400)
        .json({
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

