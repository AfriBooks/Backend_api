import { Application } from "express";
import { verifyAuthToken } from "../auth/verifyAuth";
import { createUser, authenticate, getUser, getSingleUser } from "../controllers/user";

export const userRoute = (app: Application) => {
  app.post("/user", createUser);
  app.post("/login", authenticate);
  app.get("/users", getUser);
  app.get("/user/:id", getSingleUser);
  app.delete("/user/:id");
};
