export interface ReservationInputs {
  name: string;
  phone: string;
  date: string;
}

export interface ReservationFormData extends ReservationInputs {}

export interface ReservationFormErrors {
  name?: string;
  phone?: string;
  date?: string;
}

export interface CreateReservationRequest extends ReservationInputs {}

export type ReservationStatus = "pending" | "confirmed";

export interface CreateReservationResponse {
  id: string;
  name: string;
  phone: string;
  date: string;
  status: ReservationStatus;
  createdAt: string;
}
