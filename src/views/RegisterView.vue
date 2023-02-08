<script lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import AuthUser from "@/components/AuthUser.vue";

export default {
  components: { AuthUser },
  setup() {
    const authStore = useAuthStore();
    const { isLoading } = storeToRefs(authStore);
    const { sendMagicLink } = authStore;
    return {
      isLoading,
      sendMagicLink,
    };
  },
};
</script>

<template>
  <main class="h-screen bg-zinc-900">
    <AuthUser is-registering :is-loading="isLoading" :auth-fn="sendMagicLink" />
    <div class="mt-5 text-center text-sm text-slate-300">
      <span>Have an account? </span>
      <RouterLink class="font-bold" to="/login">Login</RouterLink>
    </div>
  </main>
</template>
