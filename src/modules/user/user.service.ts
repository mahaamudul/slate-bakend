import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import config from "../../config"
import { CreateUserPayload } from "./user.interface"



const createUserInDB=async(payload:CreateUserPayload)=>{


    const {name,email,password,profilePhoto}=payload


    const isUserExist= await prisma.user.findUnique({
        where:{email}
    })

    if(isUserExist){
        throw new Error("User with this email already exist !")
    }

    const hashedPassword=await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))

    const createdUser=await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
            profile:{
                create:{
                    profilePhoto
                }//create user profile while create user
            }
        }

    });



    const user = await prisma.user.findUnique({
        where:{
            id:createdUser.id,
            email:createdUser.email || email
        },
        omit:{
            password:true
        },
        include:{
            profile:true
        }
    })

    return user

}

export const userService={
    createUserInDB

}