import {  Router } from "express";

import { userController } from "./user.controller";

import { Role } from "../../../generated/prisma/enums";

import { auth } from "../../middleware/auth";

const router = Router()



//create user 
router.post('/register', userController.createUser)







// user profile data get 
router.get('/me',auth(Role.ADMIN,Role.AUTHOR,Role.USER) , userController.getUserProfile)

// update user profile data
router.put('/my-profile',auth(Role.ADMIN,Role.AUTHOR,Role.USER) , userController.updateUserProfile) 





export const userRoutes = router