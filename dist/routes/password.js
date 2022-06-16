"use strict";
exports.__esModule = true;
exports.passRoute = void 0;
var passwordRset_1 = require("../controllers/passwordRset");
var passRoute = function (app) {
    app.post('/forgot', passwordRset_1.forgotPass);
    app.post('/reset', passwordRset_1.resetPass);
};
exports.passRoute = passRoute;
