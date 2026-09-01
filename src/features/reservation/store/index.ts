import { create } from "zustand";

import { ReservationStore } from "./types";

export const useReservationStore = create<ReservationStore>((set) => ({
  reservation: null,
  status: "idle",
  setReservation: (reservation) => set({ reservation }),
  setStatus: (status) => set({ status }),
  resetReservation: () => set({ reservation: null, status: "idle" }),
}));
