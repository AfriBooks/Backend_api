import bcrypt, { hash } from "bcrypt";
import mongoose, { model, Schema } from "mongoose";
import joi from "joi";

export interface UserData {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserData>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true},
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Password Encrypting using Bcrypt
const saltRounds = parseInt(process.env.saltRounds as string);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, saltRounds);
});

const User = mongoose.model("user", userSchema);

export const validate = (user:UserData) =>{
 const Schema = joi.object({
   name: joi.string().required(),
   email:joi.string().email().required(),
   password: joi.string().required()
 })
 return Schema.validate(user)
}

export default User;
