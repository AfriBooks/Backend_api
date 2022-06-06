import { Application } from "express";
import { createUser } from "../controllers/user";

export const userRoute = (app: Application) => {
  app.post("/user", createUser);
};
