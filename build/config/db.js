"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection = mongoose_1.default.connect("mongodb+srv://yuvraj:yuvraj@cluster0.hhjiny0.mongodb.net/customers?retryWrites=true&w=majority");
exports.default = connection;
