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
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_1 = __importDefault(require("passport"));
const uuid_1 = require("uuid");
const express_1 = __importDefault(require("express"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const Grouter = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: "221992717439-u77bv2tpqo6uhdbatucjbcasjnsi1828.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://upset-pike-flannel-shirt.cyclic.app/auth/google/callback",
}, function (accessToken, refreshToken, profile, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (profile._json.email_verified) {
            let user;
            let name = profile._json.name;
            let email = profile._json.email;
            user = yield CustomerModel_1.default.findOne({ email });
            if (user) {
                return cb(null, user);
            }
            const newUser = new CustomerModel_1.default({
                name: name,
                email: email,
                password: (0, uuid_1.v4)(),
                Role: "customer",
                Pets: [],
                status: true,
            });
            yield newUser.save();
            return cb(null, newUser);
        }
    });
}));
Grouter.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
Grouter.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/google/login",
    session: false,
}), function (req, res) {
    let user = req.user;
    var token = jsonwebtoken_1.default.sign({
        email: user.email,
        id: user._id,
        status: user.status,
        name: user.name,
        role: user.Role,
    }, "masai");
    //
    //  https://transcendent-horse-5d8cb8.netlify.app/masseges.html?id=${user._id}
    res.redirect(`https://yuvraj1307.github.io/token=${token}&name=${user.name}&role=${user.Role}`);
});
exports.default = Grouter;
