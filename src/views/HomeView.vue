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
  <main class="flex min-h-screen flex-col items-center justify-center p-10">
    <div class="z-10 w-full max-w-screen-sm">
      <div>
        <h1
          class="text-center text-4xl font-extrabold tracking-tight text-slate-400 sm:text-5xl lg:text-6xl"
        >
          Emojii-Dictionary
        </h1>
      </div>
    </div>
  </main>
</template>
