import { Router } from "express"
import { commentController } from "./comment.controller"


const router = Router()

// create comment
router.post('/',commentController.createComment)

//see all comments by author
router.get('/author/:authorId',commentController.allCommentsByAuthor)

// see  a single comment 
router.get('/:commentId',commentController.getSingleComment)

// update post comment 
router.patch('/:commentId',commentController.updateComment)

// delete comment 
router.delete('/:commentId',commentController.deleteComment)

// update comment stats 
router.patch('/:commentId/moderate',commentController.updateCommentStats)









export const commentRoutes = router