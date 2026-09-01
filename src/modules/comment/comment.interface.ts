import { CommentStatus } from "../../../generated/prisma/enums"

export interface ICreateComment{
    postId:string
    content:string
}

export interface IUpdateComment{
    content:string
}

export interface ICommentStatus{
    status:CommentStatus
}