import { Router } from "express"
import { commentController } from "./comment.controller"
import { auth } from "../../middleware/auth"
import { Role } from "../../../generated/prisma/enums"


const router = Router()

// create comment // DONE
router.post('/',auth(Role.ADMIN,Role.AUTHOR,Role.USER),commentController.createComment)

//see all comments by author //DONE
router.get('/author/:authorId',commentController.allCommentsByAuthor)

// see  a single comment //DONE
router.get('/:commentId',commentController.getSingleComment)

// update post comment 
router.patch('/:commentId',commentController.updateComment)

// delete comment 
router.delete('/:commentId',commentController.deleteComment)

// update comment stats 
router.patch('/:commentId/moderate',commentController.updateCommentStats)









export const commentRoutes = router