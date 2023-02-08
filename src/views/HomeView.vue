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
  <main
    class="flex flex-col items-center justify-center gap-10 p-10 md:mx-auto md:max-w-xl"
  >
    <div>
      <h1
        class="mb-2 text-center text-4xl font-semibold text-slate-200 md:text-6xl"
      >
        Welcome to
      </h1>
      <h1
        class="animate-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-center text-3xl font-black text-transparent md:text-5xl"
      >
        Emojii-Dictionary
      </h1>
    </div>
    <h2 class="text-center text-lg text-slate-300 md:text-2xl">
      Replace words with other words 😯
    </h2>

    <textarea
      disabled
      value="The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?"
      rows="4"
      cols="33"
      class="mt-6 h-full w-full resize-none appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400 md:mt-14"
    ></textarea>

    <Transition name="slide-fade" appear>
      <div class="mt-4 text-lg text-slate-200">
        The quick brown
        <span class="mx-1 w-auto rounded bg-slate-300 px-2 text-zinc-900"
          >🦊</span
        >
        jumps over the lazy
        <span class="mx-1 w-auto rounded bg-slate-300 px-2 text-zinc-900"
          >🐶</span
        >. If the
        <span class="mx-1 w-auto rounded bg-slate-300 px-2 text-zinc-900"
          >🐶</span
        >
        reacted, was it really lazy<span
          class="mx-1 w-auto rounded bg-slate-300 px-2 text-zinc-900"
          >? 🤔</span
        >
      </div>
    </Transition>
  </main>
</template>

<style>
.slide-fade-enter-active {
  transition: all 3.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
