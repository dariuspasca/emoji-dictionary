<script lang="ts">
import { ref } from "vue";
import { supabase } from "../helpers/supabase";

export default {
  data() {
    return {
      loading: ref(false),
      email: ref(""),
      linkSent: false,
      errorMeesage: "",
    };
  },

  methods: {
    async handleLogin() {
      this.errorMeesage = "";
      try {
        this.loading = true;
        const { error } = await supabase.auth.signInWithOtp({
          email: this.email,
        });
        if (error) throw error;
      } catch (error) {
        if (error instanceof Error) {
          this.errorMeesage = error.message;
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <main class="bg-zinc-900 h-screen">
    <div class="max-w-xs mx-auto pt-40">
      <form
        v-if="!linkSent"
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
              class="shadow appearance-none border rounded w-full py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400"
              type="email"
              placeholder="Your Email Address..."
              v-model="email"
            />
          </div>
        </div>

        <input
          type="submit"
          class="w-full bg-rose-600 hover:bg-blue-dark text-gray-200 font-bold py-2 px-4 rounded hover:cursor-pointer disabled:cursor-not-allowed"
          :value="loading ? 'Loading' : 'Continue'"
          :disabled="loading"
        />

        <p
          v-if="errorMeesage"
          class="mt-10 font-normal text-normal text-red-600"
        >
          Failed to send login link to email to {{ email }}
        </p>
      </form>
      <div v-else>
        <div class="mb-10 text-center">
          <h1 class="font-semibold text-2xl text-gray-100">
            Verify your Email
          </h1>
          <p class="font-normal text-sm text-stone-300 mt-1">
            We sent en email to <span class="text-rose-600">{{ email }}</span>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
