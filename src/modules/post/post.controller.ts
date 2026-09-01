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


// get my posts //DONE
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

//update post // DONE
const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const authorId=req.user?.id
    const isAdmin=req.user?.role==='ADMIN'
    const payload= req.body
    const postId=req.params.postId 

    const result=await postService.updatePostInDB(postId as string,payload,authorId as string,isAdmin)
    


    


    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post updated successfully",
        data: {
            result
        }
    })

})

// delete post //Done
const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    

    const authorId=req.user?.id
    const isAdmin=req.user?.role==='ADMIN'
    const postId=req.params.postId 

    
    
    const result =await postService.deletePostFrom(postId as string,authorId as string,isAdmin)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post deleted successfully !",
        data: {
            result
        }
    })

})

// get post stats 
const getStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result=await postService.getPostStatsFromDB()

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "Post Stats ",
        data: {
            result
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