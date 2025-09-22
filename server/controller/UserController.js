import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import UserSchema from "../models/UserSchema.model.js";
import mongoose from "mongoose";

export const getUsersVehicle = async (req, res) => {
    try {
        const Users = await UserSchema.find();
        if (!Users) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Users, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const getUserVehicle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendErrorResponse(res, { message: `Invalid ID format` }, 400)
        }
        const User = await UserSchema.findById(req.params.id);
        if (!User) {
            sendErrorResponse(res, { message: `User ID: ${req.params.id} not found` }, 404)
        }
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
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendErrorResponse(res, { message: `Invalid ID format` }, 400)
        }
        const User = await UserSchema.findByIdAndDelete(req.params.id);
        if (!User) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, User, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}