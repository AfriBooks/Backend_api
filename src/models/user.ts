import bcrypt, { hash } from "bcrypt";
import mongoose, { model, Schema } from "mongoose";

export interface UserData {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserData>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
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

const User = mongoose.model("User", userSchema);

export default User;
