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

// all comments by specif author //DONE
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

// get single comment // DONE
const getSingleComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const commentId=req.params.commentId

    const result=await commentService.singleCommentFromDB(commentId as string)




    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment found successfully",
        data: {
            result
        }
    })

})

// update comment // Done
const updateComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId=req.user?.id
    const commentId=req.params.commentId
    const payload=req.body

    const result=await commentService.updateCommentInDB(userId as string,commentId as string,payload)





    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment updated successfully ! ",
        data: {
            result
        }
    })

})

// delete comment // DONE
const deleteComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const userId=req.user?.id
    const commentId=req.params.commentId

    const result=await commentService.deleteCommentFromDB(userId as string,commentId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment deleted successfully",
        data: {
            result
        }
    })

})

// update comment status 
const updateCommentStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const commentId = req.params.commentId
    const payload=req.body

    const result=await commentService.updateCommentStatusInDB(commentId as string,payload)
  


    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: `Status updated to ${payload.status}`,
        data: {result}
            
    })

})



export const commentController = {

    allCommentsByAuthor,
    getSingleComment,
    createComment,
    updateComment,
    deleteComment,
    updateCommentStatus


}