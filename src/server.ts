import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";




const PORT=config.port;

async function main(){
    try{

        await prisma.$connect()
        console.log("database conneted");

        app.listen(PORT,()=>{
            console.log(`server is runnig on port:${PORT}`);
        })

    }
    catch(error){
        await prisma.$disconnect()
        console.log(error);
    }
}
main()