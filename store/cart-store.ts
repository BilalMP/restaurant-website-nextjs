"use client";

import { create } from "zustand";
import type { StateCreator } from "zustand";

export type CartStoreState = {
    cartCount: number;
    setCartCount: (count: number) => void;
    incrementBy: (delta: number) => void;
    syncFromLocalStorage: () => void;
};

const creator: StateCreator<CartStoreState> = (set, _get, _api) => ({
    cartCount: 0,
    setCartCount: (count: number) => set({ cartCount: count }),
    incrementBy: (delta: number) =>
        set((state: CartStoreState) => ({ cartCount: Math.max(0, state.cartCount + delta) })),
    syncFromLocalStorage: () => {
        if (typeof window === "undefined") return;
        try {
            const raw = localStorage.getItem("cart");
            const items = raw ? JSON.parse(raw) : [];
            const count = Array.isArray(items)
                ? items.reduce((sum: number, it: any) => sum + (Number(it?.quantity) || 0), 0)
                : 0;
            set({ cartCount: count });
        } catch {
            set({ cartCount: 0 });
        }
    },
});

export const useCartStore = create<CartStoreState>(creator);


