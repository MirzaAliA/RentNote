import express from "express";
const routerBooking = express.Router();

import {
    getBookingsVehicle,
    getBookingVehicle,
    saveBookingVehicle,
    updateBookingVehicle,
    deleteBookingVehicle,
} from "../controller/BookingController.js";

routerBooking.get('/', getBookingsVehicle);
routerBooking.post('/', saveBookingVehicle);
routerBooking.get('/:id', getBookingVehicle);
routerBooking.put('/:id', updateBookingVehicle);
routerUnits.delete('/:id', deleteBookingVehicle);

export default routerBooking;