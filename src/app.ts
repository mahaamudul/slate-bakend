
import express,{ Application, NextFunction, Request, Response } from "express";
import cors from 'cors'
import config from "./config";
import cookieParser from "cookie-parser";


import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { postRoutes } from "./modules/post/post.route";
import { commentRoutes } from "./modules/comment/comment.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

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
app.use('/api/users',userRoutes);

//login users
app.use('/api/auth',authRoutes)

//redirect to post route 
app.use('/api/posts',postRoutes)

// redirect to the comments route 
app.use('/api/comments',commentRoutes)

// route not found 
app.use(notFound)

// global error 
app.use(globalErrorHandler)

export default app