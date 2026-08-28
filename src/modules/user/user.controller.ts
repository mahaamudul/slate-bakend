import { Request, Response, } from "express";
import httpStatus from 'http-status'
import { userService } from "./user.service";



const createUser = async (req: Request, res: Response) => {

    try{
        const payload = req.body
    console.log(payload);

    const user = await userService.createUserInDB(payload)



    res.status(httpStatus.CREATED).json({
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Registration Successful !",
        data: {
            user
        }
    })
    }
    catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            successCode:httpStatus.INTERNAL_SERVER_ERROR,
            message:"Failed to register user !",
            error: (error as Error).message

        })
    }



}


export const userController = {
    createUser
}