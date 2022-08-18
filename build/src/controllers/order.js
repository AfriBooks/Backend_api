"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getOrdersByUser = exports.getOrders = void 0;
const order_1 = __importDefault(require("../models/order"));
const randomInterval = () => {
    return Math.floor(Math.random() * (6000 - 1000 + 1) + 1000);
};
let orders;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_1.default.find({});
        if (!result.length) {
            return res
                .status(202)
                .json({ message: "No orders in the database" });
        }
        orders = result;
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getOrders = getOrders;
const getOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const orders = yield order_1.default.find({ user_id: id });
        if (!orders) {
            return res.status(400).json("No orders created by this user");
        }
        res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
    }
});
exports.getOrdersByUser = getOrdersByUser;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const new_order = {
        book_id: req.body.book_id,
        quantity: req.body.quantity,
        price: req.body.price,
        user_id: req.body.user_id,
        delivery_address: req.body.delivery_address,
        status: "Order placed",
    };
    try {
        yield order_1.default.create(new_order)
            .then((response) => {
            res.status(201).json(response);
        })
            .catch((err) => console.error(err));
    }
    catch (err) {
        console.error(err);
    }
});
exports.createOrder = createOrder;
