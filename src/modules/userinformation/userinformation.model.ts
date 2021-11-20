import { Document } from "mongoose";
import { IUserInformation } from "./userinformation.interface";

export interface IUserInformationModel extends IUserInformation, Document {
  _id: string;
}


