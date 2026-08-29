import { api } from "@services/index";
import { BootstrapRequest } from "./bootstrap.service.t"

class BootstrapService {
    baseUrl = '/bootstrap'

    getDataByPage = async (request: BootstrapRequest) => {
        const response = await api.get(this.baseUrl, { params: request });
        return response.data;
    };
}

export default BootstrapService