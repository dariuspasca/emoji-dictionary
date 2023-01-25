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
  <main class="bg-zinc-900 h-screen">
    <div class="mx-8 md:max-w-xs md:mx-auto pt-40">
      <form
        v-if="!linkSentTo"
        class="flex flex-col"
        @submit.prevent="handleLogin"
      >
        <div class="mb-10 text-center">
          <h1 class="font-semibold text-2xl text-gray-100">
            Welcome to Emoji-Dictionary
          </h1>
          <p class="font-normal text-normal text-stone-300 mt-1">
            Enter your email to continue
          </p>
        </div>

        <div>
          <div class="mb-4">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400 text-gray-200"
              type="email"
              placeholder="Your Email Address..."
              v-model="email"
            />
          </div>
        </div>

        <input
          type="submit"
          class="w-full bg-rose-600 hover:bg-blue-dark text-gray-200 font-bold py-2 px-4 rounded hover:cursor-pointer disabled:cursor-not-allowed"
          :value="isLoading ? 'Loading' : 'Continue'"
          :disabled="isLoading"
        />
      </form>
      <div v-else>
        <div class="mb-10 text-center">
          <h1 class="font-semibold text-2xl text-gray-100">
            Verify your Email
          </h1>
          <p class="font-normal text-sm text-stone-300 mt-1">
            We sent en email to
            <span class="text-rose-600">{{ linkSentTo }}</span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
