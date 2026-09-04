import type { CompanyWithBrandData, DadataPartyData } from "~~/shared/models/ApiModels";
import { AxiosHandler } from "~~/shared/services/Axios";

export class ApiHandler extends AxiosHandler {

    async getCompanyByInn(inn : string){
        const response = await this._axios.get<CompanyWithBrandData>(`/company/inn/${inn}`)
        return response.data;
    }

}
