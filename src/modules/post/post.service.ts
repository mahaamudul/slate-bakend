import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"

// get all posts from db
const getAllPostsFromDB=async()=>{

    const result=await prisma.post.findMany({
        include:{
            author:{
                omit:{
                    password:true,
                    email:true
                }
            },
            comments:true
        }
    })

    return result

}

// create a post in db DONE 
const createNewPostInDB=async(payload:ICreatePostPayload,userId:string)=>{

    const result= await prisma.post.create({
        data:{
            ...payload,
            authorId:userId
        }
    })

    return result

}


// get post stats from db 
const getPostStatsFromDB=async()=>{


}

// get my post from db 
const getMyPostsFromDB=async()=>{


}

// get single post by id from db 
const getSinglePostFrom=async()=>{


}

// update post in db
const updatePostInDB=async()=>{


}

// delete post from db 
const deletePostFrom=async()=>{


}



export const postService = {
        getAllPostsFromDB,
        getPostStatsFromDB,
        getMyPostsFromDB,
        getSinglePostFrom,
        createNewPostInDB,
        updatePostInDB,
        deletePostFrom
    }

