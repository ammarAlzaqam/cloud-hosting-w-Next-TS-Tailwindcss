import { UserSchemaType } from "@/models/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StatesType {
  user: UserSchemaType | null;
  setUser: (user: UserSchemaType) => void;
}

export const useUserStore = create<StatesType>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserSchemaType) => set({ user }),
    }),
    {
      name: "user-store",
      skipHydration: true,
    }
  )
);
