import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwtToken";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                name: string;
                id: string;
                role: Role
            }
        }
    }
}



// auth middleware by role
export const auth = (...requiredRoles: Role[]) => {

    
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.cookies.accessToken? 
        req.cookies.accessToken
        : req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization
        console.log(token);


        if (!token) {
            throw new Error("You are not logged in !")
        }

        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret)
        console.log(verifiedToken);


        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error)
        }


        const { email, name, id, role } = verifiedToken.data as JwtPayload


        if (requiredRoles.length && !requiredRoles.includes(role)) {

            throw new Error("Forbidden !")

        }



        const user=await prisma.user.findFirstOrThrow({
            where:{
                id,
                email,
                name
            }
        })

        if(!user){
            throw new Error("User not found")
        }

        if(user.activeStatus==="BLOCKED"){
            throw new Error("Your account has been blocked ")
        }


        req.user={
            id,
            name,
            email,
            role
        }

        next()

    })
}