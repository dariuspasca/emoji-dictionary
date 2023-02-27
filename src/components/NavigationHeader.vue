<script lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import { BookOpenIcon } from "@heroicons/vue/24/solid";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";

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
  components: { BookOpenIcon, ChevronLeftIcon },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<template>
  <header class="bg-zinc-900">
    <div class="mx-4 flex md:container md:mx-auto md:mx-auto md:max-w-2xl">
      <nav class="flex w-full justify-start py-4 text-slate-300 md:mx-8">
        <RouterLink
          v-if="currentRouteName != 'dashboard' && user"
          to="/dashboard"
          class="inline-flex items-center text-slate-300"
          ><ChevronLeftIcon class="h-5 w-5" />Dashboard</RouterLink
        >
        <RouterLink
          v-if="currentRouteName != 'home' && !user"
          to="/"
          class="inline-flex flex-1 items-center gap-1"
        >
          <BookOpenIcon class="h-5 w-5" />Emoji-Dictionary</RouterLink
        >
        <button v-if="user" class="ml-auto" @click="logOut">Logout</button>
      </nav>
    </div>
  </header>
</template>
