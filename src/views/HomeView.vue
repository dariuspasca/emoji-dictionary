<script lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

export default {
  setup() {
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    return {
      user,
    };
  },
};
</script>

<template>
  <main class="bg-zinc-900 text-gray-100 text-center py-10">
    <h1 v-if="user" class="text-3xl">Welcome back {{ user.email }} !</h1>
    <h1 v-else class="text-3xl">Home!</h1>
  </main>
</template>
