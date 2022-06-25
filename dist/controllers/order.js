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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createOrder = exports.getOrders = void 0;
var order_1 = __importDefault(require("../models/order"));
var tracker = require("delivery-tracker");
var courier = tracker.courier(tracker.COURIER.FEDEX.fedex);
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                courier.trace({ trace_number: "123456789012" }, function (err, result) {
                    console.log(result);
                });
                return [2 /*return*/];
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, order_1["default"].find({})];
            case 2:
                orders = _a.sent();
                if (!orders.length) {
                    return [2 /*return*/, res
                            .status(202)
                            .json({ message: "No orders in the database" })];
                }
                return [2 /*return*/, res.status(200).json(orders)];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getOrders = getOrders;
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var new_order, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                new_order = {
                    book_id: req.body.book_id,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    user_id: req.body.user_id,
                    delivery_address: req.body.delivery_address,
                    status: "InfoReceived"
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, order_1["default"].create(new_order)
                        .then(function (response) {
                        res.status(201).json(response);
                    })["catch"](function (err) { return console.error(err); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
