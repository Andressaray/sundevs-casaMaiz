import { api } from "@services/index";

import { ApiRequest } from "@/types/types";

class BootstrapService {
  baseUrl = "/bootstrap";

  getBootstrapData = async (request: ApiRequest) => {
    const response = await api.get(this.baseUrl, { params: request });
    return response.data;
  };
}

export default BootstrapService;
