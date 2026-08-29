import { api } from "@services/index";
import { PagesServiceRequest } from "./pages.service.t";

class PagesService {
    baseUrl = '/pages'

    getDataByPage = async (request: PagesServiceRequest) => {
        const response = await api.get(`${this.baseUrl}/${request.slug}`, { params: request });
        return response.data;
    };
}

export default PagesService