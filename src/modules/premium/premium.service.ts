import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"
import { IPremiumPostQuery } from "./premium.interface";


const getPremiumFromDB = async (query: IPremiumPostQuery) => {

    // const premiumPost=await prisma.post.findMany({
    //     where:{
    //         isPremium:true
    //     }
    // })

    // if (premiumPost.length===0){
    //     throw new Error("There are no premium post in this moment !")
    // }

    // return premiumPost

    const limit = query.limit ? Number(query.limit) : 5;
      const page = query.page ? Number(query.page) : 1;
      const skip = (page - 1) * limit;
    
      const sortBy = query.sortBy || "createdAt";
      const sortOrder = query.sortOrder || "desc";
    
      const andConditions: Prisma.PostWhereInput[] = [];
    
      // Search by title or content
      if (query.searchTerm) {
        andConditions.push({
          OR: [
            {
              title: {
                contains: query.searchTerm,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: query.searchTerm,
                mode: "insensitive",
              },
            },
          ],
        });
      }
    
      // Filter by title
      if (query.title) {
        andConditions.push({
          title: {
            contains: query.title as string,
            mode: "insensitive",
          },
        });
      }
    
      // Filter by content
      if (query.content) {
        andConditions.push({
          content: {
            contains: query.content as string,
            mode: "insensitive",
          },
        });
      }
    
      // Filter: isPremium (handles string "false"/"true" or boolean)
      const isPremiumValue =
        query.isPremium !== undefined
          ? typeof query.isPremium === "string"
            ? query.isPremium === "false"
            : Boolean(query.isPremium)
          : true;
    
      andConditions.push({ isPremium: isPremiumValue });
    
      const result = await prisma.post.findMany({
        where: {
          AND: andConditions,
        },
        take: limit,
        skip: skip,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          author: {
            omit: {
              password: true,
              email: true,
            },
          },
          comments: true,
        },
      });
    
      const totalPostCount=await prisma.post.count({
        where:{
            AND:andConditions
        }
      })
    
      return {
        data:result,
        meta:{
            page:page,
            limit:limit,
            total:totalPostCount,
            totalPage:Math.ceil(totalPostCount/limit)
            
        }
      };



   

}


export const premiumService = {
    getPremiumFromDB
}