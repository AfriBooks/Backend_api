import  { Request, Response } from "express";
import joi from "joi";
import crypto from "crypto";
import User, { UserData } from "../models/user";
import { tokens} from "../models/tokens";
import { resetMail } from "../utils/sendEmail";

export const forgotPass = async (req: Request, res: Response) => {

  try {
    const result = joi.object({ email: joi.string().email().required() });
    const { error } = result.validate(req.body);
    if (error)
      return res.json({
        status: "error",
        error: "Enter a valid email",
      });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.json({
        status: "error",
        error: "This email does not exist",
      });

    let token = await tokens.findOne({ userId: user.id});
    if (!token) {
      token = await new tokens({
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.BASE_URL}/resetPass/${user.id}/${token.token}`;
    await resetMail(user.email, "password reset", link);

    res.json({
      status: "200",
      success: "password reset link sent to your email account",
    });
  } catch (error) {
    console.log(error);
  }
};

export const resetPass = async (req: Request, res: Response) => {
 
  try {
    const result = joi.object({ password: joi.string().required() });
    const { error } = result.validate(req.body);
    if (error)
      return res.json({
        status: 400,
        error: "invalid password format",
      });

    const user = await User.findById(req.params.userId);
    if (!user)
      return res.json({
        status: 400,
        error: "invalid link or expired",
      });

    const token = await tokens.findOne({
      userId: user.id,
      toking: req.params.token,
    });
    if (!token)
      return res.json({
        status: 400,
        error: "invalid link or expired",
      });

    user.password = req.body.password;
    await user.save();
    await token.delete();

    return res.json({
      status: 200,
      error: "password reset successfully",
    });
  } catch (error) {
    res.json({
      status: 400,
      error: "something went wrong",
    });
  }
};
