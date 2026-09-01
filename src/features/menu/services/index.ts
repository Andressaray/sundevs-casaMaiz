import { api } from "@services/index";

import { ApiRequest } from "@/types/types";

class MenuService {
  baseUrl = "/pages/menu";

  getMenuService = async (request: ApiRequest) => {
    const response = await api.get(this.baseUrl, { params: request });
    return response.data;
  };
}

export default MenuService;
