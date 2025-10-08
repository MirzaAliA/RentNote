import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import TenantSchema from "../models/TenantSchema.model.js";
import Unit from "../models/UnitSchema.model.js";
import mongoose from "mongoose";

async function paymentCalculation(vehicleInformation) {
    const vehicleID = vehicleInformation.vehicle;

    const vehicle = await Unit.findById(vehicleID);

    const startDate = new Date(vehicleInformation.rentalStartDate);
    const endDate = new Date(vehicleInformation.rentalEndDate);
    const rentalPeriod = endDate - startDate;
    const oneHour = 1000 * 60 * 60;
    const oneDay = 1000 * 60 * 60 * 24;
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const oneMonth = 1000 * 60 * 60 * 24 * 30;
    const perHour = vehicle.price.perHour;
    const perDay = vehicle.price.perDay;
    const perWeek = vehicle.price.perWeek;
    const perMonth = vehicle.price.perMonth;

    if (rentalPeriod < oneHour) {
        return sendErrorResponse(res, { message: "Rental kendaraan minimal 1 hari!" }, 400);
    } else if (rentalPeriod > (3 * oneMonth)) {
        return sendErrorResponse(res, { message: "Rental kendaraan maksimal 3 bulan!" }, 400);
    } else if (rentalPeriod > oneHour && rentalPeriod < oneDay) {
        const hours = Math.floor(rentalPeriod / oneHour);
        return (hours * perHour);
    } else if (rentalPeriod >= oneDay && rentalPeriod < oneWeek) {
        if (rentalPeriod % oneDay === 0) {
            const days = rentalPeriod / oneDay;
            return (days * perDay);
        } else {
            const hours = Math.floor((rentalPeriod % oneDay) / oneHour);
            if (hours > 5) {
                const days = Math.floor(rentalPeriod / oneDay) + 1;
                return (days * perDay);
            } else {
                const days = Math.floor(rentalPeriod / oneDay);
                return ((days * perDay) + (hours * perHour));
            }
        }
    } else if (rentalPeriod >= oneWeek && rentalPeriod < oneMonth) {
        if (rentalPeriod % oneWeek === 0) {
            const weeks = rentalPeriod / oneWeek;
            return (weeks * perWeek);
        } else {
            const weeks = Math.floor(rentalPeriod / oneWeek);
            const hours = Math.floor((rentalPeriod % oneWeek % oneDay) / oneHour);
            if (hours > 5) {
                const days = Math.floor((rentalPeriod % oneWeek) / oneDay) + 1;
                return ((weeks * perWeek) + (days * perDay));
            } else {
                const days = Math.floor((rentalPeriod % oneWeek) / oneDay);
                return ((weeks * perWeek) + (days * perDay) + (hours * perHour));
            }
        }
    } else if (rentalPeriod >= oneMonth && rentalPeriod <= (3 * oneMonth)) {
        if (rentalPeriod % oneMonth === 0) {
            const months = rentalPeriod / oneMonth;
            return (months * oneMonth);
        } else {
            const months = Math.floor(rentalPeriod / oneMonth);
            const weeks = Math.floor((rentalPeriod % oneMonth) / oneWeek);
            const hours = Math.floor((rentalPeriod % oneMonth % oneWeek % oneDay) / oneHour);
            if (hours > 5) {
                const days = Math.floor((rentalPeriod % oneMonth % oneWeek) / oneDay) + 1;
                return ((months * perMonth) + (weeks * perWeek) + (days * perDay));
            } else {
                const days = Math.floor((rentalPeriod % oneMonth % oneWeek) / oneDay);
                return ((months * perMonth) + (weeks * perWeek) + (days * perDay) + (hours * perHour));
            }
        }
    } else {
        return sendErrorResponse(res, { message: "Date input Error" }, 400);
    }
}

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
        const { vehicleInformation } = req.body;
        const { id } = req.user;
        const vehicleId = new mongoose.Types.ObjectId(vehicleInformation.vehicle)
        const totalPriceAmount = await paymentCalculation(vehicleInformation);
        const userId = new mongoose.Types.ObjectId(id);
        const Tenant = await TenantSchema.create({
            ...req.body,
            vehicleInformation: {
                vehicle: vehicleId
            },
            payment: {
                totalPriceAmount: totalPriceAmount,
            },
            createdBy: userId,
            updatedBy: userId
        });
        sendOkResponse(res, Tenant, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const updateTenantVehicle = async (req, res) => {
    try {
        const { id } = req.user;
        const { vehicleInformation } = req.body;
        const totalPriceAmount = await paymentCalculation(vehicleInformation);
        const userId = new mongoose.Types.ObjectId(id);
        const Tenant = await TenantSchema.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                payment: {
                    totalPriceAmount: totalPriceAmount,
                },
                updatedBy: userId
            },
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