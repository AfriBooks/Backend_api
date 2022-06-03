"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    isAdmin: { type: String, required: true }
}, { timestamps: true });
var TestUser = (0, mongoose_1.model)("User", userSchema);
exports["default"] = TestUser;
