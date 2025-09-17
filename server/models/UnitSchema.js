const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UnitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    plateNumber: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    },
    price: {
        perHour: {
            type: Number,
        },
        perDay: {
            type: Number,
        },
        perWeek: {
            type: Number,
        },
        perMonth: {
            type: Number,
        }
    },
    vehicleStatus: {
        type: String,
        enum: ["Ready", "Pending", "Maintenance"],
        default: "Pending"
    }
},{
    timestamps: true
})

const Unit = mongoose.model('Unit', UnitSchema);

module.exports = Unit;