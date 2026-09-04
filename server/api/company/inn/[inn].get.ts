import z from "zod";
import axiosHandler from "~~/server/services/DaDataHandler";
import { CompanyWithBrandData } from "~~/shared/models/ApiModels";

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
        const [dataBrand, okved] = await Promise.all([axiosHandler.getBrandByInn(inn.data.toString()),
            data.suggestions[0]!.data.okved ? axiosHandler.getOKVEDCompany(data.suggestions[0]!.data.okved.toString()) : null,
        ])
        return {data : data, brand : dataBrand && typeof dataBrand != "string" && dataBrand.suggestions.length >= 1 ? dataBrand : null, okved : okved } as CompanyWithBrandData
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
