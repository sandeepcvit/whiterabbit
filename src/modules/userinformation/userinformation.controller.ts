import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { APIResponse } from "../../helpers/apiResponse";
import { Error } from "../../helpers/errorManagement";
import { validatePhone } from "../../helpers/phoneNumberValidation";
import { vars } from "../../vars";
import { UserInformation } from "./userinformation.schema";
import { IUserInformation } from "./userinformation.interface";

/**
 * @use User Information Adding
 * @desc Function to add User Information.
 * @author Sandeep cv
 * @return JSON Response
 * @date Nov 20, 2021
 * @param req {Request}
 * @param res {Response}search
 */
export const add = async (req: Request, res: Response) => {
    try {
        const inputData = req.body;
        const requiredFields: string[] = ["firstName", "lastName", "email", "phone"];
        const optionalDataField: string[] = ["introduction", "experience", "achievements"];
        const insertData: any = {};

        requiredFields.forEach((field: string) => {
            if (inputData[field]) { insertData[field] = inputData[field]; }
            else throw Error(vars.MESSAGES.PAYLOAD_FIELD_MISSING.replace("#FIELD#", field), vars.STATUS.BAD_REQUEST);
        });
        optionalDataField.forEach((field: string) => {
            insertData[field] = inputData[field];
        });
        // checking duplicate email
        const emailExist: IUserInformation = await UserInformation.findOne({ email: inputData.email });
        if (emailExist) { throw Error(vars.USERINFORMATION.MESSAGES.EMAIL_EXIST, vars.STATUS.CONFLICT); }

        const valid = await validatePhone(inputData.phone);
        if (valid == false) {
          throw Error(
            vars.USERINFORMATION.MESSAGES.PHONE_VALIDATE,
            vars.STATUS.INTERNAL_SERVER_ERROR
          );
        }
        const createdUserInformation = await  UserInformation.create(insertData);
        const response = new APIResponse(
            vars.USERINFORMATION.MESSAGES.SUCCESS,
            createdUserInformation,
            vars.RESPONSE.STATUS.SUCCESS
        );
        res.status(HttpStatus.OK).json(response.generate);
    } catch (error) {
        const response = new APIResponse(
            error.message,
            error,
            vars.RESPONSE.STATUS.FAILED
        );
        res.status(error.code ? error.code : HttpStatus.INTERNAL_SERVER_ERROR)
            .json(response.generate);
    }
};

/**
 * @use  User Information Listing
 * @desc The function used to list all the user information submitted
 * @author Sandeep cv
 * @return JSON Response
 * @date Nov 20, 2021
 * @param req { Request }
 * @param res { Response } search
 */
export const listing = async (req: Request, res: Response) => {
    try {
        const inputData = req.body;
        const optionalDataField: string[] = ["offset", "limit", "search"];
        var  listUserInformation: any = {};
        optionalDataField.forEach((field: string) => {
            if (inputData[field]) {
            inputData[field] = inputData[field];
            }
        });
        const {
            where = {},
            selectFields = { firstName: 1, email: 1},
            sortBy = "createdAt",
            searchBy = "firstName",
            sortOrder = vars.DB.SORT.DESC,
            offset = 0,
            noPaging = false,
            search,
        } = inputData;
  
        let { limit = vars.DB.LIMIT } = inputData;
  
        if (noPaging) limit = 0;
        const order = [[sortBy, sortOrder.toLowerCase().trim()]];
        if (search) {
            where[searchBy] = { $regex: search };
        }
        listUserInformation = await UserInformation.find(where, selectFields)
            .sort(order)
            .skip(parseInt(offset))
            .limit(parseInt(limit));
        if (listUserInformation) {
            const response = new APIResponse(
            vars.USERINFORMATION.MESSAGES.GET_ALL_DATA,
            listUserInformation,
            vars.RESPONSE.STATUS.SUCCESS
            );
            res.status(HttpStatus.OK).json(response.generate);
        }          
    } catch (error) {
        const response = new APIResponse(
            error.message,
            error,
            vars.RESPONSE.STATUS.FAILED
        );
        res.status(error.code ? error.code : HttpStatus.INTERNAL_SERVER_ERROR)
            .json(response.generate);
    }
}

/**
 * @use Get User Information
 * @desc The function used to get the user information details.
 * @author Sandeep cv
 * @return JSON Response
 * @date Nov 20, 2021
 * @param req { Request }
 * @param res { Response } search
 */
 export const details = async (req: Request, res: Response) => {
    try {
        const userInformation = await UserInformation.findOne({ _id: req.params.userId });
        const response = new APIResponse(
            vars.USERINFORMATION.MESSAGES.GET_SINGLE_DATA,
            userInformation,
            vars.RESPONSE.STATUS.SUCCESS
        );
        res.status(HttpStatus.OK).json(response.generate);
    } catch (error) {
        const response = new APIResponse(
            error.message,
            error,
            vars.RESPONSE.STATUS.FAILED
        );
        res.status(error.code ? error.code : HttpStatus.INTERNAL_SERVER_ERROR)
            .json(response.generate);
    }
};
