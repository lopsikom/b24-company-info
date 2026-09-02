import type { DadataPartyData } from "~~/shared/models/ApiModels";
import { AxiosHandler } from "~~/shared/services/Axios";

export class ApiHandler extends AxiosHandler {

    async getCompanyByInn(inn : string){
        const response = await this._axios.get<DadataPartyData>(`/company/inn/${inn}`)
        return response.data;
    }

}
