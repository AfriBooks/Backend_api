const mongoose = require("mongoose");
mongoose.set("debug", true); // this logs mongo query to terminal

const main = async() => {
    await mongoose.connect("mongodb://localhost:27017/afribook").then(() => {
        console.log("Connected to Afribook DB!");
    });
};

export default main;