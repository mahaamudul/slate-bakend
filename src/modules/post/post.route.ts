import { Router } from "express"
import { postController } from "./post.controller"
import { auth } from "../../middleware/auth"
import { Role } from "../../../generated/prisma/enums"

const router = Router()



//see all post 
router.get('/',postController.getAllPosts )

// create a new post 
router.post('/',auth(Role.ADMIN,Role.AUTHOR,Role.USER),postController.createPost )

// post stats 
router.get('/stats',postController.getStats )

// my pots 
router.get('/my-posts',postController.getMyPosts )

// single post 
router.get('/:postId',postController.getSinglePost )

// update post 
router.patch('/:postId',postController.updatePost )

// delete post 
router.delete('/:postId',postController.deletePost )




export const postRoutes = router