import { prisma } from "../../lib/prisma"
import { ICommentInterface } from "./comment.interface"

// create comment // DONE
const createCommentInDB=async(authorId:string,payload:ICommentInterface)=>{

    await prisma.post.findUniqueOrThrow({
        where:{
            id:payload.postId
        }
    })

    const newComment=await prisma.comment.create({
        data:{
            ...payload,
            authorId
        }
    })

    return newComment

}


// get author comment // DONE
const authorCommentFromDB=async(authorId:string)=>{

    await prisma.user.findFirstOrThrow({
        where:{
            id:authorId
        }
    })

    const comments = await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            
           post:true
        },

    })
    return comments

}

// get single  comment from db 
const singleCommentFromDB=async(commentID:string)=>{

    const comment=await prisma.comment.findFirstOrThrow({
        where:{
            id:commentID
        },
        include:{
            post:true
        }
    })

    return comment

}

// update comment 
const updateCommentInDB=async()=>{

}

// delete comment 
const deleteCommentFromDB=async()=>{

}

// update comments staTS 
const updateCommentStatsInDB=async()=>{

}


export const commentService = {
    authorCommentFromDB,
    singleCommentFromDB,
    createCommentInDB,
    updateCommentInDB,
    deleteCommentFromDB,
    updateCommentStatsInDB
       
    }

