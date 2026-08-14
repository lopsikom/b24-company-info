import axios from "axios";

export class AxiosHandler {
    private readonly _axios;
    constructor(BaseUrl : string, BaseUri : string) {
        const Url = BaseUrl + BaseUri;
        this._axios = axios.create({
            baseURL : Url
        })
    }
}