import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (data) => set({ token: data.token, user: data.user }),
      logout: () => {
        set({ token: null, user: null });
        window.location.href = "/login";
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;