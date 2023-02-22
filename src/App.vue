<script lang="ts">
import { ref } from "vue";
import { supabase } from "@/helpers/supabase";
import type { User } from "@supabase/gotrue-js";
import { useAuthStore } from "@/store/auth";
import { NotificationGroup } from "@/helpers/notiwind";
import NotificationToast from "@/components/NotificationToast.vue";
import NavigationHeader from "@/components/NavigationHeader.vue";

export default {
  name: "App",
  components: {
    NavigationHeader,
    NotificationGroup,
    NotificationToast,
  },
  setup() {
    const appReady = ref(false);
    const authStore = useAuthStore();

    // check to see if user is already logged in
    const user = authStore.user;

    // if user does not exist, make app ready
    if (!user) {
      appReady.value = true;
    }

    supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        authStore.logIn(session.user as User);
      }

      appReady.value = true;
    });
    return { appReady };
  },
};
</script>

<template>
  <NotificationGroup group="bottom" position="bottom">
    <div
      class="z-90 pointer-events-none fixed inset-x-0 bottom-0 flex items-start justify-end p-6 px-4 py-6"
    >
      <div class="w-full max-w-sm"><NotificationToast /></div>
    </div>
  </NotificationGroup>
  <div v-if="appReady" class="box-border h-screen bg-zinc-900">
    <NavigationHeader />
    <RouterView />
  </div>
</template>
