import { ReservationFormData } from "../types/reservation.types";

export type ReservationSubmissionStatus =
  "idle" | "submitting" | "success" | "error";

export interface ReservationStore {
  reservation: ReservationFormData | null;
  status: ReservationSubmissionStatus;
  setReservation: (_reservation: ReservationFormData) => void;
  setStatus: (_status: ReservationSubmissionStatus) => void;
  resetReservation: () => void;
}
