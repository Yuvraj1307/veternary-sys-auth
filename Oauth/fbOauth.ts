// secret=b38f8ded9fea8366cb567a896dd95e1d

// id=939652270609291
import { Strategy as FacebookStrategy } from "passport-facebook";

import passport from "passport";
import { v4 as uuidv4 } from "uuid";
import express, { Router } from "express";
import Customermodel from "../model/CustomerModel";
import { Document } from "mongoose";
const FBrouter: Router = express.Router();
import jwt from "jsonwebtoken";

passport.use(
  new FacebookStrategy(
    {
      clientID: "939652270609291",
      clientSecret: "b38f8ded9fea8366cb567a896dd95e1d",
      callbackURL:
        "https://zany-gray-clownfish-shoe.cyclic.app/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      interface User {
        name: string;
        email: string;
        password: string;
        Role: string;
        Pets?: string[];
        status: boolean;
      }
      if (profile._json.email_verified) {
        let user: User | null;
        let name = profile._json.name;
        let email = profile._json.email;

        user = await Customermodel.findOne({ email });

        if (user) {
          return cb(null, user);
        }

        const newUser = new Customermodel({
          name: name,
          email: email,
          password: uuidv4(),
          Role: "customer",
          Pets: [],
          status: true,
        });

        await newUser.save();
        return cb(null, newUser);
      }
    }
  )
);

FBrouter.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  Role: string;
  Pets?: string[];
  status: boolean;
}
FBrouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/facebook/login",
    session: false,
  }),
  function (req, res) {
    let user = req.user as IUser;

    var token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        status: user.status,
        name: user.name,
        role: user.Role,
      },
      "masai"
    );
    //
    //  https://transcendent-horse-5d8cb8.netlify.app/masseges.html?id=${user._id}
    res.redirect(
      `https://yuvraj1307.github.io/token=${token}&name=${user.name}&role=${user.Role}`
    );
  }
);

export default FBrouter;
