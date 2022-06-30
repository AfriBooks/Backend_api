import { Request, Response } from "express";
import Order from "../models/order";

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({});
        if (!orders.length) {
            return res
                .status(202)
                .json({ message: "No orders in the database" });
        }
        return res.status(200).json(orders);
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
        status: "pending",
        tracking_id: ""
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
