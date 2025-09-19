import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import UserSchema from "../models/UserSchema.model.js";

export const getUsersVehicle = async (req, res) => {
    try {
        const Users = await UserSchema.find();
        sendOkResponse(res, Users, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const getUserVehicle = async (req, res) => {
    try {
        const User = await UserSchema.findById(req.params.id);
        sendOkResponse(res, User, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const saveUserVehicle = async (req, res) => {
    try {
        const User = await UserSchema.create(req.body);
        sendOkResponse(res, User, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const updateUserVehicle = async (req, res) => {
    try {
        const User = await UserSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );
        sendOkResponse(res, User, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const deleteUserVehicle = async (req, res) => {
    try {
        const User = await UserSchema.findByIdAndDelete(req.params.id);
        sendOkResponse(res, User, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}