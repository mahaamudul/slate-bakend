import { NextFunction, Request, Response, } from "express";
import httpStatus from 'http-status'
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;


    const user = await userService.createUserInDB(payload)


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Registration Successful !",
        data: {
            user
        }
    })

})

    export const userController = {
        createUser
    }