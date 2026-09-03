import { count, error } from "node:console"
import { CommentStatus, PostStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload, IPostQuery, IUpdatePostPayload } from "./post.interface"
import { title } from "node:process"

// get all posts from db // DONE
const getAllPostsFromDB = async (query: IPostQuery) => {
    const limit=query.limit?Number(query.limit):5
    const page=query.page?Number(query.page):1

    const skip=(page-1)*limit

    const sortBy=query.sortBy? query.sortBy: "createdAt"

    const sortOrder=query.sortOrder? query.sortOrder:"desc"

    const result = await prisma.post.findMany({

        where: {
            AND: [

                query.searchTerm ? {
                    OR: [
                        {
                            title: {
                                contains: query.searchTerm,
                                mode: "insensitive"
                            }
                            
                        },
                        {
                            content: {
                                contains: query.searchTerm,
                                mode: "insensitive"
                            }
                            
                        }
                    ]
                } : {},

                query.title ? { title: query.title } : {},

                query.content ? { content: query.content } : {},

            ]
        },

        take:limit,
        skip:skip,

        orderBy:{
            [sortBy]:sortOrder
        },
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
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if(!post){
        throw new Error("Post not found !")
    }
    

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


    const transactionResult = await prisma.$transaction(


        async (tx) => {

            const [
                totalPosts,
                totalPublishedPosts,
                totalArchivedPosts,
                totalDraftPosts,
                totalViewSum,
                totalComments,
                totalApprovedComment,
                totalRejectComment

            ] = await Promise.all([

                await tx.post.count(),

                await tx.post.count({
                    where: {
                        status: PostStatus.PUBLISHED
                    }
                }),
                await tx.post.count({
                    where: {
                        status: PostStatus.DRAFT
                    }
                }),
                await tx.post.count({
                    where: {
                        status: PostStatus.ARCHIVED
                    }
                }),

                await tx.post.aggregate({
                    _sum: {
                        views: true
                    }
                }),




                await tx.comment.count(),

                await tx.comment.count({
                    where: {
                        status: CommentStatus.APPROVED
                    }
                }),

                await tx.comment.count({
                    where: {
                        status: CommentStatus.REJECT
                    }
                })

            ])



            return {
                totalPosts,
                totalPublishedPosts,
                totalArchivedPosts,
                totalDraftPosts,
                totalView: totalViewSum._sum.views,
                totalComments,
                totalApprovedComment,
                totalRejectComment
            }

        }
    )

    return transactionResult

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

