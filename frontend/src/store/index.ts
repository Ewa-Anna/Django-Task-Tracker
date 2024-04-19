import { create } from 'zustand';

export const useAccountStore = create((set) => ({
    isLoggedIn: false,
    account: undefined,
    setAccount: (user): void => set({ account: user }),

    setIsLoggedIn: (bol): void => set({ isLoggedIn: bol }),
}));