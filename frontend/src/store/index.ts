import { create } from "zustand";

export const useAccountStore = create((set) => ({
  isLoggedIn: false,
  account: undefined,
  csrfToken: undefined,
  setAccount: (user): void => set({ account: user }),
  setCsrfToken: (token): void => set({ csrfToken: token }),

  setIsLoggedIn: (bol): void => set({ isLoggedIn: bol }),
}));
