import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import User, { UserData } from "../models/user";
import { findAndUpdateUser, getGoogleOauthTokens, getGoogleUser } from "../service/user.service";

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
                { payload: existingUser },
                `${process.env.TOKEN_SECRET}`,
                { expiresIn: "2h" }
            );
            res.cookie("auth_token", token);
            res.status(200).json({ token, name: existingUser.name });
        }
    } catch (error) {
        console.error(error);
        res.status(400);
        res.json(error);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});
        if (!users.length) {
            return res.json({
                status: 202,
                error: "No user in the database",
            });
        }
        const allUsers = users.length;
        res.json({ total: allUsers, users });
        res.status(200);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.json({
                status: 202,
                error: "No user with that id",
            });
        }
        res.json(user);
        res.status(200);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

export const deleteUser = async (req: Request, res: Response) => {};



export const googleHandler =async (req: Request, res: Response)=>{
   try {
    // get the codes from qs
    const code = req.query.code as string;

    //get the id and access tokens with the code
    const {id_token, access_token} = await getGoogleOauthTokens({code});
    // get user with token
    //@ts-ignore
    const googleUser = await getGoogleUser({ id_token, access_token })

    if(!googleUser.verified_email){
        return res.status(403).send('Google account is not verified')
    }
    //upsert the user
     const user = await findAndUpdateUser({
        email: googleUser.email,
     },
     {
        email: googleUser.email,
        name: googleUser.name,
     },
     {
        upsert: true,
        new: true
     })
    //redirect to profile

    //create access and refresh tokens

    //set cookies

    //redirect back to client
   } catch (error) {
    console.log(error, 'Failed to authorize google user');
    
   }
    
}