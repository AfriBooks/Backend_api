import express, { Request, Response, Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import main from "./database";
import bookRoutes from "./routes/book";

main().catch((err) => console.error(err));

const app: Application = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

bookRoutes(app);

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
