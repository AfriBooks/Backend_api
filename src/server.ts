import express, { Request, Response, Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import passport from "passport";
import main from "./database";
import bookRoutes from "./routes/book";
import { userRoute } from "./routes/user";
import { passRoute } from "./routes/password";

// require('./utils/google');

main().catch((err) => console.error(err));

const app: Application = express();
const port: number | string = process.env.PORT || 8080;

config();
// app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

bookRoutes(app);
userRoute(app);
passRoute(app);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to AfriBook API");
});

app.get("*", (req: Request, res: Response) => {
    res.status(404).send("This route does not exist");
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

export default app;
