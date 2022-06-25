"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passRoute = void 0;
const passwordRset_1 = require("../controllers/passwordRset");
const passRoute = (app) => {
    app.post('/forgot', passwordRset_1.forgotPass);
    app.post('/reset', passwordRset_1.resetPass);
};
exports.passRoute = passRoute;
