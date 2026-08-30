import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status'
import { postService } from "./post.service";


// get all posts 
const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const result=await postService.getAllPostsFromDB()

    


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All post data fetched successfully",
        data: {
            result
        }
    })

})

//create post   DONE
const createPost  = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    

    const id=req.user?.id
    const payload=req.body

    const result=await postService.createNewPostInDB(payload,id as string)
    

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post created successfully",
        data: {
            result
        }
    })

})

// get stats 
const getStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    


    


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "from stats  ",
        data: {
            
        }
    })

})

// get my posts 
const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    

    const userId=req.user?.id

    const result=await postService.getMyPostsFromDB(userId as string)
    


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "My all posts retrieve successfully",
        data: {
            result
        }
    })

})

// get single post // DONE
const getSinglePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const postId=req.params.postId

    
    const result=await postService.getSinglePostFromDB(postId as string)

    if(!postId){
        throw new Error("Post id is required in params")
    }


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Post retrieve successfully",
        data: {
            result
        }
    })

})

//update post 
const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    


    


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "from update post",
        data: {
            
        }
    })

})

// delete post 
const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    


    


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "from delete post",
        data: {
            
        }
    })

})



export const postController = {
        getAllPosts,
        getStats,
        getMyPosts,
        getSinglePost,
        createPost,
        updatePost,
        deletePost

    }