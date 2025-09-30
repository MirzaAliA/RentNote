import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import AccessoriesSchema from "../models/AccessoriesSchema.model.js";
import mongoose from "mongoose";

export const getAccessoriessVehicle = async (req, res) => {
    try {
        const Accessoriess = await AccessoriesSchema.find();
        if (!Accessoriess) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Accessoriess, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const getAccessoriesVehicle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendErrorResponse(res, { message: `Invalid ID format` }, 400)
        }
        const Accessories = await AccessoriesSchema.findById(req.params.id);
        if (!Accessories) {
            sendErrorResponse(res, { message: `User ID: ${req.params.id} not found` }, 404)
        }
        sendOkResponse(res, Accessories, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const saveAccessoriesVehicle = async (req, res) => {
    try {
        const { id } = req.user;
        const userId = new mongoose.Types.ObjectId(id);
        const Accessories = await AccessoriesSchema.create({
            ...req.body,
            createdBy: userId,
            updatedBy: userId
        });
        sendOkResponse(res, Accessories, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const updateAccessoriesVehicle = async (req, res) => {
    try {
        const { id } = req.user;
        const userId = new mongoose.Types.ObjectId(id);
        const Accessories = await AccessoriesSchema.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                updatedBy: userId
            },
            {
                new: true
            }
        );
        sendOkResponse(res, Accessories, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}

export const deleteAccessoriesVehicle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendErrorResponse(res, { message: `Invalid ID format` }, 400)
        }
        const Accessories = await AccessoriesSchema.findByIdAndDelete(req.params.id);
        if (!Accessories) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Accessories, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}