import Order from "../models/order";
import { deleteBook } from "./book";

//solution
//service gets pending orders
//service makes patch call to /order to change pending to infoReceived
//according to where order is (i.e - after random intervals), services makes patch calls to /order
//..to change status to: inTransit, delivered, returned (last 2 is according to what a user clicked)

const randomInterval = () => {
    return Math.floor(Math.random() * (6000 - 1000 + 1) + 1000);
};

let statusArray: string[] = [];
let status = "";
const getStatus = async () => {
    try {
        const orders = await Order.find({});
        for (let order in orders) {
            statusArray.push(orders[order].status);
        }
    } catch (error) {
        console.error("Failed to get order with error: ", error);
    }
};

// loop status array
// change status to next status at random interval

// const updateStatus = () => {
//     switch (status) {
//         case "pending":
//             console.log("infoReceived");
//             // make patch call to change the status after given interval (random interval)

//             break;
//         case "infoReceived":
//             console.log("inTransit");
//             break;
//         case "inTransit":
//             console.log("delivered");
//             break;
//         // case "delivered":
//         //     console.log("returned");
//         //     break;
//         default:
//             console.log("All orders resolved");
//     }
//     return status;
// };

// setTimeout(() => {
//     updateStatus();
// }, randomInterval());
