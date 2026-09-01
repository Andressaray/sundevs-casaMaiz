import {
  ReservationFormErrors,
  ReservationInputs,
} from "../types/reservation.types";

const NAME_MIN_LENGTH = 3;
const PHONE_PATTERN = /^[+]?[0-9\s-]{7,15}$/;

export const validateName = (name: string): string | undefined => {
  const trimmed = name.trim();

  if (!trimmed) {
    return "reservations.form.errors.name_required";
  }
  if (trimmed.length < NAME_MIN_LENGTH) {
    return "reservations.form.errors.name_too_short";
  }
  return undefined;
};

export const validatePhone = (phone: string): string | undefined => {
  const trimmed = phone.trim();

  if (!trimmed) {
    return "reservations.form.errors.phone_required";
  }
  if (!PHONE_PATTERN.test(trimmed)) {
    return "reservations.form.errors.phone_invalid";
  }
  return undefined;
};

export const validateDate = (date: string): string | undefined => {
  if (!date) {
    return "reservations.form.errors.date_required";
  }

  const selected = new Date(`${date}T00:00:00`);
  if (Number.isNaN(selected.getTime())) {
    return "reservations.form.errors.date_invalid";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selected.getTime() < today.getTime()) {
    return "reservations.form.errors.date_past";
  }
  return undefined;
};

export const validateReservationForm = (
  data: ReservationInputs,
): ReservationFormErrors => ({
  name: validateName(data.name),
  phone: validatePhone(data.phone),
  date: validateDate(data.date),
});

export const isReservationFormValid = (
  errors: ReservationFormErrors,
): boolean => !errors.name && !errors.phone && !errors.date;
