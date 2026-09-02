import z from "zod";
import axiosHandler from "~~/server/services/DaDataHandler";

export default defineEventHandler(async (event) => {

        const inn = z.number().safeParse(Number(getRouterParams(event).inn));
        if(!inn.success) throw createError({
            statusCode : 400,
            statusMessage : "Invalid Inn"
        })
    try {
        const data = await axiosHandler.getCompanyByInn(inn.data.toString())
        if(data.suggestions.length <= 0 || !data) {
            throw createError({
                statusCode : 404,
                statusMessage : "Not Found"
            })
        }
        return data
    }catch(e : any){
        console.log(e)
        if(e.statusCode) {
            throw createError(e)
        }
        else{
            throw createError({
            statusCode : 500,
            statusMessage : "Invalid Error",
            statusText : String(e)
        })
        }
    }
})