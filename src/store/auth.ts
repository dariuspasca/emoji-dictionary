import { defineStore } from "pinia";
import type { User } from "@supabase/gotrue-js";
import { supabase } from "@/helpers/supabase";
import { computed, ref } from "vue";
import { notify } from "@/helpers/notiwind";
import router from "@/router";

export const useAuthStore = defineStore("user", () => {
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
        notify(
          {
            group: "bottom",
            title: "Error",
            text: "Ops, something unexpected happened",
            type: "error",
          },
          2000
        );
      }
    } finally {
      isLoading.value = true;
      user.value = null;
      router.push("/");
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
        notify(
          {
            group: "bottom",
            title: "Error",
            text: "Ops, something unexpected happened",
            type: "error",
          },
          2000
        );
      }
    } finally {
      isLoading.value = false;
    }
  };

  return { user, isLoading, logIn, logOut, isLoggedIn, sendMagicLink };
});
