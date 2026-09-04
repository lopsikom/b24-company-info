import { AxiosHandler } from "~~/shared/services/Axios";
import {DadataBrandData, DadataPartyData, OkvedData} from "~~/shared/models/ApiModels"

export class DaDataHandler extends AxiosHandler {

    private baseUriCompany : string;
    private baseUriBrand : string;

    constructor(BaseUri : string, data? : {header? : object}){
        super(BaseUri, data);
        this.baseUriCompany = useRuntimeConfig().DadataPath
        this.baseUriBrand = useRuntimeConfig().DadataPathBrand
    }

    async getCompanyByInn (inn : string){
        const response = await this._axios.post< { suggestions : DadataPartyData[]}>(this.baseUriCompany + "findById/party",{query : inn})
        return response.data;
    }
    async getBrandByInn(inn : string){
    
        const response = await this._axios.post<{suggestions : DadataBrandData[]}>(this.baseUriBrand + "findById/brand", {query : inn}, {validateStatus: () => true})
        return response.data
    }
    async getOKVEDCompany(code : string){
        const response = await this._axios.post<{suggestions : OkvedData[]}>(this.baseUriCompany + "findById/okved2", {query : code}, {validateStatus: () => true})
        return response.data
    }

}

const token = useRuntimeConfig().Token
const SecretKey = useRuntimeConfig().SecretKey
console.log(token)
console.log(SecretKey)
const axiosHandler = new DaDataHandler("", {header : {"Authorization" : "Token " + token, "X-Secret" : SecretKey}})

export default axiosHandler