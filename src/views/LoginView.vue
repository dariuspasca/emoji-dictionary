<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../helpers/supabase";

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="bg-gray-200 h-screen">
    <div class="container mx-auto pt-40">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-3xl mx-auto"
        @submit.prevent="handleLogin"
      >
        <div class="mb-4">
          <h1 class="font-semibold text-2xl text-gray-700">Welcome</h1>
          <p class="font-normal text-normal text-gray-600 mt-1">
            Sign in to your account via magic link with your email below
          </p>
        </div>

        <div>
          <div class="mb-4">
            <label
              class="block text-gray-800 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3"
              type="email"
              placeholder="Your email"
              id="email"
              v-model="email"
            />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <input
            type="submit"
            class="bg-pink-600 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded hover:cursor-pointer disabled:cursor-not-allowed"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
          />
        </div>
      </form>
    </div>
  </main>
</template>
