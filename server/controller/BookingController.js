import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import BookingSchema from "../models/AccessoriesSchema.model.js";

export const getBookingsVehicle = async (req, res) => {
    try {
        const Bookings = await BookingSchema.find();
        sendOkResponse(res, Bookings, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const getBookingVehicle = async (req, res) => {
    try {
        const Booking = await BookingSchema.findById(req.params.id);
        sendOkResponse(res, Booking, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const saveBookingVehicle = async (req, res) => {
    try {
        const Booking = await BookingSchema.create(req.body);
        sendOkResponse(res, Booking, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500)
    }
}

export const updateBookingVehicle = async (req, res) => {
    try {
        const Booking = await BookingSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
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
        const Booking = await BookingSchema.findByIdAndDelete(req.params.id);
        sendOkResponse(res, Booking, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}