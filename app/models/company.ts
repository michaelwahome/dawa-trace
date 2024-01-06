import mongoose, {Schema} from "mongoose";

const companySchema = new Schema(
    {
        companyName: {
            type: String,
            required: [true, "Company name is required."],
            trim: true,
        },
        email:{
            type: String,
            required: [true, "E-mail is required."],
            trim: true,
            match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"]
        },
        phone:{
            type: String,
            required: [true, "Phone number is required."],
            trim: true,
            match: [/^\+\d+$|^\d+$/, "Invalid phone number"]
        },
        physicalAddress:{
            type: String,
            required: [true, "Physical address is required."],
            trim: true
        },
        role: {
            type: String,
            required: [true, "Please choose your company type."],
            enum: ["manufacturer", "distributor", "retailer"],
            lowercase: true
        },
        address:{
            type: String,
            required: [true, "Please connect wallet."],
            trim: true,
            unique: true
        }
    },
    {timestamps: true}
);

const Company = mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;