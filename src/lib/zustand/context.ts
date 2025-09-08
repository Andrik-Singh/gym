
import { create } from "zustand";
interface StoreState {
  numberOfDays: number;
  setNumberOfDays: (days: number) => void;
}
export const useStore = create<StoreState>((set) => ({
  numberOfDays: 0,
  setNumberOfDays: (days: number) => {
    set(() => ({ numberOfDays: days }));
  },
}))