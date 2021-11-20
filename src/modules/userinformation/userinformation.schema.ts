import mongoose = require("mongoose");
import { IUserInformationModel } from "./userinformation.model";

const userInformationSchema: mongoose.Schema = new mongoose.Schema({
    firstName: { type: String, required: [true, "can't be blank"],  minlength: 2, maxlength: 100 },
    lastName: { type: String, required: [true, "can't be blank"],  minlength: 2, maxlength: 100 },
    email: { type: String, lowercase: true, required: [true, "can't be blank"] },
    phone: { type: String },
    introduction: { type: String },
    experience: { type: String },
    achievements: { type: String },
}, { timestamps: true });

export const UserInformation = mongoose.model<IUserInformationModel>("UserInformation", userInformationSchema);
