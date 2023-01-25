<script lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

export default {
  setup() {
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    const { logOut } = authStore;

    return {
      user,
      logOut,
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<template>
  <header class="bg-zinc-900">
    <div class="flex mx-4 md:container md:mx-auto">
      <nav class="flex justify-between text-gray-100 py-4 w-full md:mx-8">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="currentRouteName != 'login' && !user" to="/login"
          >Login</RouterLink
        >
        <button v-if="user" @click="logOut">Logout</button>
      </nav>
    </div>
  </header>
</template>
