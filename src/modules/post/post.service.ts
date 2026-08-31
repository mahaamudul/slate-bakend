import { count } from "node:console"
import { CommentStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface"

// get all posts from db // DONE
const getAllPostsFromDB = async () => {

    const result = await prisma.post.findMany({
        include: {
            author: {
                omit: {
                    password: true,
                    email: true
                }
            },
            comments: true
        }
    })

    return result

}

// create a post in db // DONE 
const createNewPostInDB = async (payload: ICreatePostPayload, userId: string) => {

    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    })

    return result

}


// get my post from db // DONE
const getMyPostsFromDB = async (authorId: string) => {
    const post = await prisma.post.findMany({
        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            comments: true,
            author: {
                omit: {
                    password: true,
                    email: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            }
        },

    })

    return post

}

// get single post by id from db // DONE
const getSinglePostFromDB = async (postId: string) => {


    // await prisma.post.update({



    //     where:{
    //         id:postId
    //     },
    //     data:{
    //         views:{
    //             increment:1
    //         }
    //     },


    // })

    // throw new Error("fake error")

    // const post=await prisma.post.findFirstOrThrow({
    //     where:{
    //         id:postId
    //     },
    //     include:{
    //         author:{
    //             omit:{
    //                 password:true,
    //                 email:true
    //             }
    //         },
    //         comments:{
    //             where:{
    //                 status:CommentStatus.APPROVED
    //             },
    //             orderBy:{
    //                 createdAt: 'desc'
    //             }
    //         },
    //         _count:{
    //             select:{
    //                 comments:true
    //             }
    //         }

    //     },

    // })

    // return post


    // handle single post with transaction for handle rollback 

    const transactionResult = await prisma.$transaction(
        async (tx) => {
            await tx.post.update({
                where: {
                    id: postId
                },
                data: {
                    views: {
                        increment: 1
                    }
                }
            })

            // throw new Error("fake error")
            const post = await prisma.post.findFirstOrThrow({
                where: {
                    id: postId
                },
                include: {
                    author: {
                        omit: {
                            password: true,
                            email: true
                        }
                    },
                    comments: {
                        where: {
                            status: CommentStatus.APPROVED
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    },
                    _count: {
                        select: {
                            comments: true
                        }
                    }

                },

            })
            return post

        }
    )

    return transactionResult


}

// update post in db //DONE
const updatePostInDB = async (postId: string, payload: IUpdatePostPayload, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findFirstOrThrow({
        where: {
            id: postId
        }
    })

    if (!isAdmin && authorId !== post.authorId) {
        throw new Error("You are not author of this post ")
    }

    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: payload,
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })

    return updatedPost

}

// delete post from db 
const deletePostFrom = async (postId: string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findFirstOrThrow({
        where: {
            id: postId
        }
    })

    if (!isAdmin && authorId !== post.authorId) {
        throw new Error("You are not author of this post ")
    }

    await prisma.post.delete({
        where: {
            id: postId
        },


    })

    return null


}

// get post stats from db 
const getPostStatsFromDB = async () => {


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

