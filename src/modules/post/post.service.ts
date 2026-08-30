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

// create a post in db // DONE 
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
const getMyPostsFromDB=async(authorId:string)=>{
    const post=await prisma.post.findMany({
        where:{
            authorId
        },
        orderBy:{
            createdAt:"desc"
        },
        include:{
            comments:true,
            author:{
                omit:{
                    password:true,
                    email:true
                }
            },
            _count:{
                select:{
                    comments:true
                }
            }
        },
        
    })

    return post

}

// get single post by id from db // DONE
const getSinglePostFromDB=async(postId:string)=>{

    // const post=await prisma.post.findFirstOrThrow({
    //     where:{
    //         id:postId
    //     }
    // })

    const updatedPost=await prisma.post.update({
        where:{
            id:postId
        },
        data:{
            views:{
                increment:1
            }
        },
        include:{
            author:{
                omit:{
                    password:true,
                    email:true
                }
            }
        }

    })

    return updatedPost


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
        getSinglePostFromDB,
        createNewPostInDB,
        updatePostInDB,
        deletePostFrom
    }

