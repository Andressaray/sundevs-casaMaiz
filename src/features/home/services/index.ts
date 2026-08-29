import { api } from "@services/index";
import { BootstrapRequest } from "../types/boostrap";

class HomeService {
    baseUrl = '/'

    getBootstrapService = async (request: BootstrapRequest) => {
        const response = await api.get(this.baseUrl, { params: request });
        return response.data;
    };
}

export default HomeService