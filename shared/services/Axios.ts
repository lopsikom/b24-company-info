import axios from "axios";

export class AxiosHandler {
    protected readonly _axios;
    constructor(BaseUrl : string, data? : {header? : object}) {
        this._axios = axios.create({
            baseURL : BaseUrl,
            headers : data?.header
        })
    }
}   