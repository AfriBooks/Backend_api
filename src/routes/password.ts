import { Application } from "express";
import { forgotPass, resetPass } from "../controllers/passwordRset";


export const passRoute = (app: Application) => {
    app.post('/forgot', forgotPass);
    app.post('/reset', resetPass);
  };