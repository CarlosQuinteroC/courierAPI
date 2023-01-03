import mongoose from "mongoose";

const { Schema } = mongoose;

const CompanySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: 'company',
        versionKey: false,
    }
);

const Company = mongoose.model('Company', CompanySchema);
export default Company;