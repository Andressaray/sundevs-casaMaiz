import { api } from "@services/index";

import { PagesRequest } from "./pages.types";

class PagesService {
  baseUrl = "/pages";

  getDataByPage = async (request: PagesRequest) => {
    const response = await api.get(`${this.baseUrl}/${request.slug}`, {
      params: request,
    });
    return response.data;
  };
}

export default PagesService;
