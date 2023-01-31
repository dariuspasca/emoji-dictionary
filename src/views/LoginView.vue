<script lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

export default {
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
      email: ref(""),
      linkSentTo: "",
    };
  },
  methods: {
    async handleLogin() {
      this.linkSentTo = "";
      await this.sendMagicLink(this.email);
      this.linkSentTo = this.email;
    },
  },
};
</script>

<template>
  <main class="h-screen bg-zinc-900">
    <div class="mx-8 pt-40 md:mx-auto md:max-w-xs">
      <form
        v-if="!linkSentTo"
        class="flex flex-col"
        @submit.prevent="handleLogin"
      >
        <div class="mb-10 text-center">
          <h1
            class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent"
          >
            > Welcome to Emoji-Dictionary
          </h1>
          <p class="text-normal mt-2 font-normal text-stone-300">
            Enter your email to continue
          </p>
        </div>

        <div>
          <div class="mb-4">
            <input
              class="w-full appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400 shadow"
              type="email"
              placeholder="Your Email Address..."
              v-model="email"
            />
          </div>
        </div>

        <input
          type="submit"
          class="w-full rounded border-2 border-purple-500 bg-indigo-500/[0.05] py-2 px-4 font-bold text-purple-500 hover:cursor-pointer hover:border-pink-500 hover:text-pink-500 disabled:cursor-not-allowed"
          :value="isLoading ? 'Loading' : 'Continue'"
          :disabled="isLoading"
        />
      </form>
      <div v-else>
        <div class="mb-10 text-center">
          <h1 class="text-2xl font-semibold text-gray-100">
            Verify your Email
          </h1>
          <p class="mt-1 text-sm font-normal text-stone-300">
            We sent en email to
            <span
              class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >{{ linkSentTo }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
