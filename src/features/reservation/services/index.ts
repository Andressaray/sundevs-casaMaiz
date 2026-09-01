import { api } from "@services/index";

import { ApiRequest } from "@/types/types";
import {
  CreateReservationResponse,
  ReservationFormData,
} from "../types/reservation.types";

class ReservationService {
  baseUrl = "/reservations";

  createReservationService = async (
    data: ReservationFormData,
    request?: ApiRequest,
  ): Promise<CreateReservationResponse> => {
    const response = await api.post(this.baseUrl, data, {
      params: request,
    });
    return response.data;
  };
}

export default ReservationService;
