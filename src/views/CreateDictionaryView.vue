<script lang="ts">
import { ref } from "vue";
export default {
  data() {
    return {
      name: ref(""),
      title: ref(""),
      description: ref(""),
      isLoading: false,
    };
  },
  watch: {
    name(newVal) {
      this.name = newVal.toLowerCase();
    },
  },
};
</script>

<template>
  <main class="bg-zinc-900 h-screen">
    <div class="mx-8 md:max-w-3xl md:mx-auto pt-40">
      <form class="flex flex-col">
        <h1
          class="text-5xl mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        >
          > Create a new dictionary
        </h1>

        <section>
          <h2 class="font-medium text-xl text-gray-300 mb-4">
            Let's get started!
          </h2>
          <div class="flex mb-4 items-center justify-between">
            <label for="name" class="text-gray-200 w-64">Dictionary name</label>
            <input
              class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400 text-gray-200"
              type="name"
              placeholder="Give an unique name to your dictionary"
              v-model="name"
            />
          </div>
        </section>

        <section class="py-10">
          <h2 class="font-medium text-xl text-gray-300 mb-4">Customize</h2>
          <div class="flex mb-4 items-center justify-between">
            <label for="name" class="text-gray-200 w-64">Title</label>
            <input
              class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400 text-gray-200"
              type="title"
              placeholder="Dictionary page description"
              v-model="title"
            />
          </div>
          <div class="flex mb-4 items-center justify-between">
            <label for="name" class="text-gray-200 w-64">Description</label>
            <input
              class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400 text-gray-200"
              type="description"
              placeholder="Dictionary page description"
              v-model="description"
            />
          </div>
        </section>

        <section>
          <h2 class="font-medium text-xl text-gray-300 mb-4">Your words</h2>
        </section>

        <input
          type="submit"
          class="mx-auto w-96 bg-indigo-500/[0.05] border-2 text-pink-500 border-pink-500 hover:text-purple-500 hover:border-purple-500 font-bold py-2 px-4 rounded hover:cursor-pointer disabled:cursor-not-allowed"
          :value="isLoading ? 'Loading' : 'Create'"
          :disabled="isLoading"
        />
      </form>
    </div>
  </main>
</template>
