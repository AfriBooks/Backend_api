import { Application } from "express";
import { createUser, authenticate } from "../controllers/user";

export const userRoute = (app: Application) => {
  app.post("/user", createUser);
  app.post("/login", authenticate);
};
