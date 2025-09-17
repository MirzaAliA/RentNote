const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccessoriesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    amount: {
        type: number,
    },
    accessoriesPrice: {
        type: Number,
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
},{
    timestamps: true
})

const Accessories = mongoose.model('Accessories', AccessoriesSchema);

module.exports = Accessories;