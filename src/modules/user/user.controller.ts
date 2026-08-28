import { Request, Response, } from "express";
import httpStatus from 'http-status'
import { userService } from "./user.service";



const createUser = async (req: Request, res: Response) => {

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


export const userController = {
    createUser
}