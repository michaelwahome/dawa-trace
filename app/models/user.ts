import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required."],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required."],
            trim: true,
        },
        dob:{
            type: Date,
            required: [true, "Date of birth is required."]
        },
        email:{
            type: String,
            required: [true, "E-mail is required."],
            trim: true,
            match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"]
        },
        phone:{
            type: String,
            trim: true,
            match: [/^\+\d+$|^\d+$/, "Invalid phone number"]
        },
        physicalAddress:{
            type: String,
            trim: true
        },
        role: {
            type: String,
            required: [true, "User role unspecified."],
            enum: ["user", "admin", "superadmin"],
            default: "user"
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;