"use strict";
exports.__esModule = true;
exports.getUserAuth = void 0;
var getUserAuth = function (req, res, next) {
    try {
        var user_auth = req.cookies.auth_token;
    }
    catch (error) {
        return res.json(error);
    }
    next();
};
exports.getUserAuth = getUserAuth;
