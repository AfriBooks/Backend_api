"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const user_1 = require("../controllers/user");
const userRoute = (app) => {
    app.post("/user", user_1.createUser);
    app.post("/login", user_1.authenticate);
    app.get("/users", user_1.getUser);
    app.get("/user/:id", user_1.getSingleUser);
    app.delete("/user/:id");
};
exports.userRoute = userRoute;
