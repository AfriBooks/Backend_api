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
const order_1 = __importDefault(require("../models/order"));
//solution
//service gets pending orders
//service makes patch call to /order to change pending to infoReceived
//according to where order is (i.e - after random intervals), services makes patch calls to /order
//..to change status to: inTransit, delivered, returned (last 2 is according to what a user clicked)
const randomInterval = () => {
    return Math.floor(Math.random() * (6000 - 1000 + 1) + 1000);
};
let statusArray = [];
let status = "";
const getStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find({});
        for (let order in orders) {
            statusArray.push(orders[order].status);
        }
    }
    catch (error) {
        console.error("Failed to get order with error: ", error);
    }
});
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
