import { PostWhereInput } from "../../../generated/prisma/models"

export interface IPremiumPostQuery extends PostWhereInput{
    
    page?:string
    sortBy?:string
    sortOrder?:string
    searchTerm?:string
    limit?:string
}