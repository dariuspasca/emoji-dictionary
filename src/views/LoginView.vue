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
  data() {
    return {
      completed: false,
    };
  },
};
</script>

<template>
  <main>
    <AuthUser
      :is-loading="isLoading"
      :auth-fn="sendMagicLink"
      @on-complete="completed = true"
    />
    <div v-if="!completed" class="mt-5 text-center text-sm text-slate-300">
      <span>No account? </span>
      <RouterLink class="font-bold" to="/register">Create one</RouterLink>
    </div>
  </main>
</template>
