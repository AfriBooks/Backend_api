import { model, Schema } from "mongoose";

type Order = {
    book_id: string;
    quantity: number;
    price: number;
    user_id: string;
    delivery_address: string;
    status: string;
};

const OrderSchema = new Schema<Order>(
    {
        book_id: { type: String, required: true, trim: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        user_id: { type: String, required: true, trim: true },
        delivery_address: { type: String, required: true, trim: true },
        status: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

const Order = model("Order", OrderSchema);

export default Order;
