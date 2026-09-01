import { useMutation } from "react-query";

import { useReservationStore } from "../../store";
import {
  CreateReservationResponse,
  ReservationFormData,
} from "../../types/reservation.types";
import ReservationService from "../../services";

const reservationService = new ReservationService();

const useCreateReservation = () => {
  const setReservation = useReservationStore((state) => state.setReservation);
  const setStatus = useReservationStore((state) => state.setStatus);

  const {
    mutate: createReservation,
    mutateAsync: createReservationAsync,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    reset,
  } = useMutation<CreateReservationResponse, Error, ReservationFormData>({
    mutationFn: async (formData) => {
      return await reservationService.createReservationService(formData);
    },
    onMutate: (formData) => {
      setReservation(formData);
      setStatus("submitting");
    },
    onSuccess: () => {
      setStatus("success");
    },
    onError: () => {
      setStatus("error");
    },
  });

  return {
    createReservation,
    createReservationAsync,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    reset,
  };
};

export default useCreateReservation;
