import { User } from "../users/User.js";
import  jwt  from "jsonwebtoken";

const longinService = (email) => User.findOne({ email: email }).select("+password");

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.SECRET, {expiresIn: 86400})
}

export { longinService, generateToken };
