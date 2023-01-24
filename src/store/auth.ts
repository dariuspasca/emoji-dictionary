import { defineStore } from "pinia";
import type { User } from "@supabase/gotrue-js";
import { supabase } from "@/helpers/supabase";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("counter", () => {
  const user = ref<User | null>(null);
  const isLoading = ref(false);
  const isLoggedIn = computed(() => !!user.value);

  const logIn = (newUser: User) => {
    if (!newUser) return;
    user.value = newUser;
  };

  const logOut = async () => {
    try {
      isLoading.value = true;
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    } finally {
      isLoading.value = true;
      user.value = null;
    }
  };

  const sendMagicLink = async (email: string) => {
    try {
      isLoading.value = true;
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    } finally {
      isLoading.value = false;
    }
  };

  return { user, isLoading, logIn, logOut, isLoggedIn, sendMagicLink };
});
