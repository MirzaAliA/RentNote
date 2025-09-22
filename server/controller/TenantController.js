import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import TenantSchema from "../models/TenantSchema.model.js";
import mongoose from "mongoose";

export const getTenantsVehicle = async (req, res) => {
    try {
        const Tenants = await TenantSchema.find();
        if (!Tenants) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Tenants, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const getTenantVehicle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendErrorResponse(res, { message: `Invalid ID format` }, 400)
        }
        const Tenant = await TenantSchema.findById(req.params.id);
        if (!Tenant) {
            sendErrorResponse(res, { message: `User ID: ${req.params.id} not found` }, 404)
        }
        sendOkResponse(res, Tenant, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const saveTenantVehicle = async (req, res) => {
    try {
        const Tenant = await TenantSchema.create(req.body);
        sendOkResponse(res, Tenant, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const updateTenantVehicle = async (req, res) => {
    try {
        const Tenant = await TenantSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );
        sendOkResponse(res, Tenant, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const deleteTenantVehicle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendErrorResponse(res, { message: `Invalid ID format` }, 400)
        }
        const Tenant = await TenantSchema.findByIdAndDelete(req.params.id);
        if (!Tenant) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Tenant, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}