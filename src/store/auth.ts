import { defineStore } from "pinia";
import type { User } from "@supabase/gotrue-js";
import { supabase } from "@/helpers/supabase";

export type RootState = {
  user: User | null;
};

export const useAuthStore = defineStore({
  id: "auth",
  state: () =>
    ({
      user: null,
    } as RootState),

  actions: {
    logIn(user: User) {
      if (!user) return;

      this.user = user;
    },

    async logOut() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unexpected error", error);
        }
      } finally {
        this.user = null;
      }
    },
  },
});
