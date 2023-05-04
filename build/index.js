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
const express_1 = __importDefault(require("express"));
const googleOauth_1 = __importDefault(require("./Oauth/googleOauth"));
const db_1 = __importDefault(require("./config/db"));
const fbOauth_1 = __importDefault(require("./Oauth/fbOauth"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("hello");
});
app.use("/", googleOauth_1.default);
app.use("/", fbOauth_1.default);
app.listen(4500, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default;
        console.log("connected to db");
        console.log("server is running on port 4500");
    }
    catch (error) {
        console.log(error);
    }
}));
