"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    book_id: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    user_id: { type: String, required: true, trim: true },
    delivery_address: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
}, { timestamps: true });
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
