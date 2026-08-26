"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Plan } from "@/lib/data/plans";

export type CartItem = {
  plan: Plan;
  quantity: number;
};

export type ESimStatus = "pending" | "active" | "expired";

export type OwnedESim = {
  orderId: string;
  plan: Plan;
  purchasedAt: string;
  status: ESimStatus;
  activationCode: string;
  iccid: string;
};

type AppState = {
  cart: CartItem[];
  esims: OwnedESim[];
  addToCart: (plan: Plan) => void;
  removeFromCart: (planId: string) => void;
  updateQuantity: (planId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => OwnedESim[];
  cartTotal: number;
  cartCount: number;
};

const AppStateContext = createContext<AppState | undefined>(undefined);

const CART_KEY = "esim-app:cart";
const ESIMS_KEY = "esim-app:esims";

function randomHex(length: number): string {
  const chars = "0123456789ABCDEF";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function makeActivationCode(): string {
  return `LPA:1$esim.example.com$${randomHex(8)}-${randomHex(4)}-${randomHex(4)}`;
}

function makeIccid(): string {
  const digits = Array.from({ length: 17 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return `89${digits}`;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [esims, setEsims] = useState<OwnedESim[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let nextCart: CartItem[] | null = null;
    let nextEsims: OwnedESim[] | null = null;
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      const storedEsims = localStorage.getItem(ESIMS_KEY);
      if (storedCart) nextCart = JSON.parse(storedCart);
      if (storedEsims) nextEsims = JSON.parse(storedEsims);
    } catch {
      // ignore corrupt local storage
    }
    // One-time sync from localStorage (an external system) on mount; SSR has no
    // access to it, so this can't be a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (nextCart) setCart(nextCart);
    if (nextEsims) setEsims(nextEsims);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(ESIMS_KEY, JSON.stringify(esims));
  }, [esims, hydrated]);

  function addToCart(plan: Plan) {
    setCart((prev) => {
      const existing = prev.find((item) => item.plan.id === plan.id);
      if (existing) {
        return prev.map((item) =>
          item.plan.id === plan.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { plan, quantity: 1 }];
    });
  }

  function removeFromCart(planId: string) {
    setCart((prev) => prev.filter((item) => item.plan.id !== planId));
  }

  function updateQuantity(planId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(planId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.plan.id === planId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function checkout(): OwnedESim[] {
    const newEsims: OwnedESim[] = cart.flatMap((item) =>
      Array.from({ length: item.quantity }, () => ({
        orderId: `ORD-${Date.now()}-${randomHex(4)}`,
        plan: item.plan,
        purchasedAt: new Date().toISOString(),
        status: "active" as ESimStatus,
        activationCode: makeActivationCode(),
        iccid: makeIccid(),
      }))
    );
    setEsims((prev) => [...newEsims, ...prev]);
    clearCart();
    return newEsims;
  }

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.plan.priceUSD * item.quantity, 0),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  return (
    <AppStateContext.Provider
      value={{
        cart,
        esims,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        checkout,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return ctx;
}
