const mongoose = require("mongoose");
mongoose.set("debug", true); // this logs mongo query to terminal
import dotenv from "dotenv";
import { MONGO_ATLAS_URI } from "./conn_string";
dotenv.config();

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const main = async () => {
    await mongoose
        .connect(MONGO_ATLAS_URI, connectionParams)
        .then(() => {
            console.log("Connected to Afribook DB!");
        })
        .catch((err: any) => {
            console.error(`Error connecting to the database. n${err}`);
        });
};

export default main;
