import { create } from "zustand";
import type{HomeStore} from "./type.t";

export const useAppStore = create<HomeStore>((set) => ({
  boostrap: null,
  setBoostrap: (boostrap) => set({boostrap})
}));
