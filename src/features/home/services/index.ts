import { api } from "@services/index";

import { ApiRequest } from "@/types/types";

class HomeService {
  baseUrl = "/pages/home";

  getHomeService = async (request: ApiRequest) => {
    const response = await api.get(this.baseUrl, { params: request });
    return response.data;
  };
}

export default HomeService;
