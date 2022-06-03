"use strict";
exports.__esModule = true;
exports.userAuth = void 0;
var userAuth = function (req, res, next) {
    try {
        var user_auth = req.cookies.auth_token;
        if (user_auth) {
            return user_auth;
        }
        return false;
    }
    catch (error) {
        return console.log(error);
    }
    next();
};
exports.userAuth = userAuth;
