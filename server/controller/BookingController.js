import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import BookingSchema from "../models/AccessoriesSchema.model.js";
import mongoose from "mongoose";

export const getBookingsVehicle = async (req, res) => {
    try {
        const Bookings = await BookingSchema.find();
        if (!Bookings) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Bookings, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const getBookingVehicle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendErrorResponse(res, { message: `Invalid ID format` }, 400)
        }
        const Booking = await BookingSchema.findById(req.params.id);
        if (!Booking) {
            sendErrorResponse(res, { message: `User ID: ${req.params.id} not found` }, 404)
        }
        sendOkResponse(res, Booking, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const saveBookingVehicle = async (req, res) => {
    try {
        const { id } = req.user;
        const { name, phoneNumber, vehicleInformation, payment } = req.body;
        if (!name) {
            return sendErrorResponse(res, { message: "Please input a Name" }, 401)
        }

        if (!phoneNumber) {
            return sendErrorResponse(res, { message: "Please input a Phone Number" }, 401)
        }

        if (!vehicleInformation) {
            return sendErrorResponse(res, { message: "Please input Vehicle Information" }, 401)
        }

        if (!payment) {
            return sendErrorResponse(res, { message: "Please input Payment" }, 401)
        }
        const userId = new mongoose.Types.ObjectId(id);
        const Booking = await BookingSchema.create({
            name,
            phoneNumber,
            vehicleInformation,
            payment,
            createdBy: userId,
            updatedBy: userId,
        });
        sendOkResponse(res, Booking, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const updateBookingVehicle = async (req, res) => {
    try {
        const { id } = req.user;
        const { name, phoneNumber, vehicleInformation, payment } = req.body;
        if (!name) {
            return sendErrorResponse(res, { message: "Please input a Name" }, 401)
        }

        if (!phoneNumber) {
            return sendErrorResponse(res, { message: "Please input a Phone Number" }, 401)
        }

        if (!vehicleInformation) {
            return sendErrorResponse(res, { message: "Please input Vehicle Information" }, 401)
        }

        if (!payment) {
            return sendErrorResponse(res, { message: "Please input Payment" }, 401)
        }

        const userId = new mongoose.Types.ObjectId(id);
        const Booking = await BookingSchema.findByIdAndUpdate(
            req.params.id,
            {
                name,
                phoneNumber,
                vehicleInformation,
                payment,
                updatedBy: userId
            },
            {
                new: true
            }
        );
        sendOkResponse(res, Booking, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const deleteBookingVehicle = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return sendErrorResponse(res, { message: `Invalid ID format` }, 400)
        }
        const Booking = await BookingSchema.findByIdAndDelete(req.params.id);
        if (!Booking) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Booking, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}