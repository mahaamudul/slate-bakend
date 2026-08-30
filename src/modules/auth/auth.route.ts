import { Router } from "express";
import { authController } from "./auth.controller";

const router=Router()

// login user 
router.post("/login",authController.loginUser)


// generate new access token by refresh token 
router.post("/refresh-token",authController.refreshToken)

export const authRoutes=router;