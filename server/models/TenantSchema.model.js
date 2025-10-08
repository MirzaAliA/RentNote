import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const TenantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        residentialAddress: {
            type: String,
        },
        originAddress: {
            type: String
        },
    },
    background: {
        job: {
            type: String,
            enum: ["Mahasiswa", "ASN", "Swasta"],
            default: "Mahasiswa"
        },
        institution: {
            type: String
        },
        position: {
            type: String
        }
    },
    parentInformation: {
        parentName: {
            type: String
        },
        parentPhoneNumber: {
            type: Number
        }
    },
    collateral: {
        amount: {
            type: Number,
            enum: [1, 2, 3, 4],
            default: 1
        },
        collateralType: {
            type: String
        }
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
            default: "Cash"
        },
        paidOff: {
            type: String,
            enum: ["Yes", "No", "Unknown"],
            default: "Yes"
        },
        unpaidFees: {
            type: Number
        },
        totalPriceAmount: {
            type: Number
        }
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const Tenant = mongoose.model('Tenant', TenantSchema);

export default Tenant;