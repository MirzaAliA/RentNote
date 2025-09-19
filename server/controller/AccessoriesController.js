import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import AccessoriesSchema from "../models/AccessoriesSchema.model.js";

export const getAccessoriessVehicle = async (req, res) => {
    try {
        const Accessoriess = await AccessoriesSchema.find();
        sendOkResponse(res, Accessoriess, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const getAccessoriesVehicle = async (req, res) => {
    try {
        const Accessories = await AccessoriesSchema.findById(req.params.id);
        sendOkResponse(res, Accessories, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const saveAccessoriesVehicle = async (req, res) => {
    try {
        const Accessories = await AccessoriesSchema.create(req.body);
        sendOkResponse(res, Accessories, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const updateAccessoriesVehicle = async (req, res) => {
    try {
        const Accessories = await AccessoriesSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
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
        const Accessories = await AccessoriesSchema.findByIdAndDelete(req.params.id);
        sendOkResponse(res, Accessories, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}