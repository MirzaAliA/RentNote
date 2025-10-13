import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import UnitSchema from "../models/UnitSchema.model.js";
import mongoose from "mongoose";

export const getUnitsVehicle = async (req, res) => {
    try {
        const Units = await UnitSchema.find();
        if (!Units) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Units, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const getUnitVehicle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendErrorResponse(res, { message: `Invalid ID format` }, 400)
        }
        const Unit = await UnitSchema.findById(req.params.id);
        if (!Unit) {
            sendErrorResponse(res, { message: `User ID: ${req.params.id} not found` }, 404)
        }
        sendOkResponse(res, Unit, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const saveUnitVehicle = async (req, res) => {
    try {
        const { id } = req.user;
        const { name, brand, plateNumber, year, price, vehicleStatus } = req.body;
        const userId = new mongoose.Types.ObjectId(id);
        const Unit = await UnitSchema.create({
            name,
            brand,
            plateNumber,
            year,
            price,
            vehicleStatus,
            createdBy: userId,
            updatedBy: userId
        });

        sendOkResponse(res, Unit, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const updateUnitVehicle = async (req, res) => {
    try {
        const { id } = req.user;
        const userId = new mongoose.Types.ObjectId(id);
        const {
            price,
            name,
            brand,
            plateNumber,
            year,
            vehicleStatus
        } = req.body
        const Unit = await UnitSchema.findByIdAndUpdate(
            req.params.id,
            {
                name,
                brand,
                plateNumber,
                year,
                price,
                vehicleStatus,
                updatedBy: userId,
            },
            {
                new: true
            }
        );
        sendOkResponse(res, Unit, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const deleteUnitVehicle = async (req, res) => {
    try {
        const Unit = await UnitSchema.findByIdAndDelete(req.params.id);
        if (!Unit) {
            return sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Unit, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}