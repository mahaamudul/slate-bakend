import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from 'http-status'

const loginUser=catchAsync(async (req:Request,res:Response, next:NextFunction)=>{

    const payload=req.body


    const loginUserResult= await authService.loginUserFromDb(payload);


    sendResponse(res,{

        success:true,
        statusCode:httpStatus.CREATED,
        message:"User Login !",
        data:loginUserResult

    })

})

export const authController={
    loginUser
}