
import express,{ Application, Request, Response } from "express";
import cors from 'cors'
import config from "./config";
import cookieParser from "cookie-parser";
import httpStatus from "http-status"
import { prisma } from "./lib/prisma";

import bcrypt from "bcryptjs";
import { userRoutes } from "./modules/user/user.route";

const app:Application=express()

app.use(cors({
    origin:config.app_url,
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


// home route
app.get('/', (req:Request,res:Response)=>{

  
    res.send("hello world")
})

// register user
app.use('/api/users',userRoutes)




export default app