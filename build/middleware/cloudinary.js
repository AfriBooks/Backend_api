"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const express_1 = require("express");
const cloudinary = require("cloudinary").v2;
// cloudinary configuration
cloudinary.config({
    cloud_name: "sastech",
    api_key: "155361388456896",
    api_secret: "14v9ziFVwg_eXuYG2ORoTky9GR4",
});
const uploadFile = (cover) => {
    cloudinary.uploader
        .upload(cover)
        .then((result) => {
        express_1.response.status(200).send({
            message: "success",
            result,
        });
    })
        .catch((error) => {
        express_1.response.status(500).send({
            message: "failure",
            error,
        });
    });
};
exports.uploadFile = uploadFile;
