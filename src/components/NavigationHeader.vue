<script lang="ts">
import { useAuthStore } from "@/store/auth";

export default {
  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },
};
</script>

<template>
  <header class="bg-zinc-900">
    <div class="container mx-auto">
      <nav class="flex justify-between text-gray-100 py-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login" v-if="!authStore.user">Login</RouterLink>
        <button v-else @click="authStore.logOut">Logout</button>
      </nav>
    </div>
  </header>
</template>
