import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"

import httpStatus from 'http-status'
import { premiumService } from "./premium.service"

// get premium content
const getPremium = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    
    
    const result=await premiumService.getPremiumFromDB(req.query)

    


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Premium content retrieve successfully !",
        data: {
            result
        }
    })

})





export const premiumController={
    getPremium,
    
}