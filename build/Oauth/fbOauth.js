"use strict";
// secret=b38f8ded9fea8366cb567a896dd95e1d
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
// id=939652270609291
const passport_facebook_1 = require("passport-facebook");
const passport_1 = __importDefault(require("passport"));
const uuid_1 = require("uuid");
const express_1 = __importDefault(require("express"));
const CustomerModel_1 = __importDefault(require("../model/CustomerModel"));
const FBrouter = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: "939652270609291",
    clientSecret: "b38f8ded9fea8366cb567a896dd95e1d",
    callbackURL: "https://zany-gray-clownfish-shoe.cyclic.app/auth/facebook/callback",
    profileFields: ["id", "displayName", "photos", "email"],
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
FBrouter.get("/auth/facebook", passport_1.default.authenticate("facebook", { scope: ["email"] }));
FBrouter.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", {
    failureRedirect: "/facebook/login",
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
exports.default = FBrouter;
