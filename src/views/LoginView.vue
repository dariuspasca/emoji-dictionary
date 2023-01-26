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
          <h1
            class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
          >
            > Welcome to Emoji-Dictionary
          </h1>
          <p class="font-normal text-normal text-stone-300 mt-2">
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
          class="w-full bg-indigo-500/[0.05] border-2 text-purple-500 border-purple-500 hover:text-pink-500 hover:border-pink-500 font-bold py-2 px-4 rounded hover:cursor-pointer disabled:cursor-not-allowed"
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
            <span
              class="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
              >{{ linkSentTo }}</span
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
