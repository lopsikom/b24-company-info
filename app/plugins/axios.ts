import { ApiHandler } from "~/services/ApiHandler"

export default defineNuxtPlugin(() => {

    const baseURL = useRuntimeConfig().public.BaseUri as string ?? ""
    const api = new ApiHandler(baseURL + 'api/',)

    return {
        provide : {
            api
        }
    }
})