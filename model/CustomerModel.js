"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    Role: {
        type: String,
        enum: ["customer", "doctor", "admin"],
        default: "customer",
    },
    Pets: [{ type: String }],
    status: { type: Boolean, default: true },
});
const Customermodel = mongoose_1.default.model("customer", customerSchema);
exports.default = Customermodel;
