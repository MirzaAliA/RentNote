import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import BookingSchema from "../models/AccessoriesSchema.model.js";

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
        if (!Booking) {
            sendErrorResponse(res, { message: `Data not found` }, 404)
        }
        sendOkResponse(res, Booking, "Success");
    }
    catch (err) {
        sendErrorResponse(res, err, 500);
    }
}