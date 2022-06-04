import bcrypt, { hash } from "bcrypt";
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

// Password Encrypting using Bcrypt
const saltRounds = parseInt(process.env.saltRounds as string);
//const pepper: string | undefined = process.env.myPlaintextPassword as string;

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
 this.password = await bcrypt.hash(this.password, saltRounds)
})


const User = mongoose.model("User", userSchema);

export default User;
