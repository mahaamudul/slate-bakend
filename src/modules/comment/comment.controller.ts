import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status'


// create comment 
const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {






    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "create comment ",
        data: {

        }
    })

})

// all comments by specif author
const allCommentsByAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {






    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: " all comments by specif author",
        data: {

        }
    })

})

// get single comment 
const getSingleComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {






    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "single comment",
        data: {

        }
    })

})

// update comment 
const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {






    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "update comment ",
        data: {

        }
    })

})

// delete comment 
const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {






    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "delete comment  ",
        data: {

        }
    })

})

// update comment stats 
const updateCommentStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {





    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "update comment stats  ",
        data: {

        }
    })

})



export const commentController = {

    allCommentsByAuthor,
    getSingleComment,
    createComment,
    updateComment,
    deleteComment,
    updateCommentStats


}