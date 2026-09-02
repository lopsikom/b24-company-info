import { AxiosHandler } from "~~/shared/services/Axios";
import {DadataPartyData} from "~~/shared/models/ApiModels"

export class DaDataHandler extends AxiosHandler {

    async getCompanyByInn (inn : string){
        const response = await this._axios.post< { suggestions : DadataPartyData[]}>("findById/party",{query : inn})
        return response.data;
    }

}

const token = useRuntimeConfig().Token
const path = useRuntimeConfig().DadataPath
const axiosHandler = new DaDataHandler(path, {header : {"Authorization" : "Token " + token}})

export default axiosHandler