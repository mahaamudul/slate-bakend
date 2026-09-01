import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { commentService } from "./comment.service";


// create comment // DONE
const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const authorId=req.user?.id
    const payload=req.body

    const result=await commentService.createCommentInDB(authorId as string,payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Comment created successfully",
        data: {
            result
        }
    })

})

// all comments by specif author
const allCommentsByAuthor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const authorId=req.params.authorId

    const result=await commentService.authorCommentFromDB(authorId as string)




    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Author comments retrieve successfully !",
        data: {
            result
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