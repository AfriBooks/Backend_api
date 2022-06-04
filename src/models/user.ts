import mongoose, { model, Schema } from "mongoose";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

const userSchema = new Schema<UserData>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
