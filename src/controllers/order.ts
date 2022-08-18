import { Request, Response } from "express";
import Order from "../models/order";

const randomInterval = () => {
    return Math.floor(Math.random() * (6000 - 1000 + 1) + 1000);
};

let orders: object[];

export const getOrders = async (req: Request, res: Response) => {
    try {
        const result = await Order.find({});
        if (!result.length) {
            return res
                .status(202)
                .json({ message: "No orders in the database" });
        }
        orders = result;
        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
    }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const orders = await Order.find({ user_id: id });
        if (!orders) {
            return res.status(400).json("No orders created by this user");
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
    }
};

export const createOrder = async (req: Request, res: Response) => {
    const new_order = {
        book_id: req.body.book_id,
        quantity: req.body.quantity,
        price: req.body.price,
        user_id: req.body.user_id,
        delivery_address: req.body.delivery_address,
        status: "Order placed",
    };
    try {
        await Order.create(new_order)
            .then((response) => {
                res.status(201).json(response);
            })
            .catch((err) => console.error(err));
    } catch (err) {
        console.error(err);
    }
};
