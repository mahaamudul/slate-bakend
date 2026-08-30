import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from 'http-status'



// login user 
const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body


    const { accessToken, refreshToken } = await authService.loginUserFromDb(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 day
    })


    sendResponse(res, {

        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Login !",
        data: { accessToken, refreshToken }

    })

})



// refresh token generate 
const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken=req.cookies.refreshToken;

    const {accessToken}= await authService.refreshToken(refreshToken)

   


    

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    })

    

    sendResponse(res, {

        success: true,
        statusCode: httpStatus.OK,
        message: "Refresh token generated !",
        data: {accessToken }

    })

})





export const authController = {
    loginUser,
    refreshToken
}