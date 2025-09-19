import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import UserSchema from "../models/UserSchema.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Hash Password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const findUser = await UserSchema.findOne({ email });

        // console.log(findUser);

        // Compare Password
        const comparePassword = await bcrypt.compare(password, findUser.password);

        if (!findUser.email === email) {
            return sendErrorResponse(res, "Email not found", 500)
        }

        if (!comparePassword) {
            return sendErrorResponse(res, "Password don't match", 500)
        }

        // Generate Token
        const token = jwt.sign({
            id: findUser._id.toString(),
            email: findUser.email,
        }, process.env.SECRET, { expiresIn: 60 * 60 * 24 });

        sendOkResponse(res, token, "Success Login");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}

export const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const findUser = await UserSchema.findOne({ email });

        // if(!findUser) {
        //     return sendErrorResponse(res, "")
        // }

        if (findUser) {
            if (email === findUser.email) {
                return sendErrorResponse(res, { message: "Email has already been taken" }, 500);
            }
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const register = await UserSchema.create({
            email,
            name,
            password: hashedPassword
        });

        sendOkResponse(res, register.name, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}