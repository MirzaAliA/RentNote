const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    vehicleInformation: {
        vehicle: {
            type: Schema.Types.ObjectId,
            ref: "Unit"
        },
        helmetAmount: {
            type: Number,
        },
        raincoatAmount: {
            type: Number,
        },
        rentalStartDate: {
            type: Date,
        },
        rentalEndDate: {
            type: Date,
        },
    },
    payment: {
        paymentMethod: {
            type: String,
            enum: ["Cash", "Transfer"],
            default: "Transfer"
        },
        paidOff: {
            type: String,
            enum: ["Yes", "No", "Unknown"],
            default: "Yes"
        },
        unpaidFees: {
            type: Number
        }
    }
},{
    timestamps: true
})

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;