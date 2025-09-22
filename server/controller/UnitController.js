import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import UnitSchema from "../models/UnitSchema.model.js";

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
        const Unit = await UnitSchema.create(req.body);
        sendOkResponse(res, Unit, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const updateUnitVehicle = async (req, res) => {
    try {
        const Unit = await UnitSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
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
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Unit, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}