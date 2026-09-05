import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"

import httpStatus from 'http-status'
import { subscriptionService } from "./subscription.service"

// create checkout
const createCheckout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId=req.user?.id
    
    const result=await subscriptionService.createCheckout(userId as string)
    

    


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment succeed",
        data: {
            result
        }
    })

})


// handle webhook
const handleWebhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const event=req.body as Buffer
    const signature=req.headers['stripe-signature']!

    await subscriptionService.handleWebhook(event,signature as string)


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Webhook triggered",
        data: null
    })

})


const getSubscriptionStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const userId=req.user?.id

    const result=await subscriptionService.getSubscriptionStatus(userId as string)


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Subscription status retrieve successfully !",
        data: {
            result
        }
    })

})


export const subscriptionController={
    createCheckout,
    handleWebhook,
    getSubscriptionStatus
}