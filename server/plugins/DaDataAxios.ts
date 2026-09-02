import { useNuxtApp } from "nuxt/app"
import { DaDataHandler } from "../services/DaDataHandler"

export default defineNitroPlugin((nitroApp) => {
    const token = useRuntimeConfig().Token
    const path = useRuntimeConfig().DadataPath
    
    const axiosHandler = new DaDataHandler(path, {header : {"Authorization" : token}})

    return axiosHandler
})