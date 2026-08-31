import { Router } from "express"
import { postController } from "./post.controller"
import { auth } from "../../middleware/auth"
import { Role } from "../../../generated/prisma/enums"

const router = Router()



//see all post 
router.get('/',postController.getAllPosts )

// create a new post 
router.post('/',auth(Role.ADMIN,Role.AUTHOR,Role.USER),postController.createPost )


// my pots 
router.get('/my-posts',auth(Role.ADMIN,Role.AUTHOR,Role.USER),postController.getMyPosts )

// single post 
router.get('/:postId',postController.getSinglePost )

// update post 
router.patch('/:postId',auth(Role.ADMIN,Role.AUTHOR,Role.USER),postController.updatePost )

// delete post 
router.delete('/:postId',auth(Role.ADMIN,Role.AUTHOR,Role.USER),postController.deletePost )

// post stats 
router.get('/stats',postController.getStats )




export const postRoutes = router