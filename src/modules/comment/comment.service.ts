import { prisma } from "../../lib/prisma"
import { ICommentStatus, ICreateComment, IUpdateComment } from "./comment.interface"


// create comment // DONE
const createCommentInDB=async(authorId:string,payload:ICreateComment)=>{

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

// get single  comment from db // DONE
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

// update comment //DONE
const updateCommentInDB=async(userId:string,commentId:string,payload:IUpdateComment)=>{

    await prisma.comment.findFirstOrThrow({
        where:{
            id:commentId,
            authorId:userId
        }
    })

    const updatedComment=await prisma.comment.update({
        where:{
            id:commentId
        },
        data:{
            content:payload.content
        }
    })

    return updatedComment

}

// delete comment // DONE
const deleteCommentFromDB=async(userId:string,commentId:string)=>{
    await prisma.comment.findFirstOrThrow({
        where:{
            id:commentId,
            authorId:userId
        }
    })

    await prisma.comment.delete({
        where:{
            id:commentId
        }
        
    })

    return null

}

// update comments status 
const updateCommentStatusInDB=async(commentId:string,payload:ICommentStatus)=>{

    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id:commentId
        },
        select: {
            id: true,
            status: true
        }
    });

    if (commentData.status === payload.status) {
        throw new Error(`Your provided status (${payload.status}) is already up to date.`)
    }

    const comment = await prisma.comment.update({
        where: {
            id:commentId
        },
        data:{
            status:payload.status
        }
    });

    return comment;

}


export const commentService = {
    authorCommentFromDB,
    singleCommentFromDB,
    createCommentInDB,
    updateCommentInDB,
    deleteCommentFromDB,
    updateCommentStatusInDB
       
    }

