import { api } from "@services/index";

import { ApiRequest } from "@/types/types";
class PrivacyService {
  baseUrl = "/legal/privacy_policy";

  getPrivacyService = async (request: ApiRequest) => {
    const response = await api.get(this.baseUrl, { params: request });
    return response.data;
  };
}

export default PrivacyService;
