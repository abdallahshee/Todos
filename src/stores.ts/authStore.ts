

import { userNoPassword } from "@/models/user.model";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface AuthState {
  user: userNoPassword | null;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist<AuthState>(
      () => ({
        user: null,
        isAuthenticated: false,
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
