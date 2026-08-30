import { NextFunction, Request, Response, } from "express";
import httpStatus from 'http-status'
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


import jwt from "jsonwebtoken"
import config from "../../config";
import { jwtUtils } from "../../utils/jwtToken";


// create profile 
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


// get user profile 
const getUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {



    const userProfile=await userService.getProfileFromDb(req.user?.id as string)


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User fetch Successful !",
        data: {
            userProfile
        }
    })

})

const updateUserProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId=req.user?.id

    const payload=req.body

    const updateProfile=await userService.updateUserProfileInDb(userId as string,payload)


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User profile updated !",
        data: {
            updateProfile
        }
    })

})

    export const userController = {
        createUser,
        getUserProfile,
        updateUserProfile
    }