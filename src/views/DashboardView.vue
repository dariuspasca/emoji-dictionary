<script lang="ts">
import { PencilIcon } from "@heroicons/vue/24/solid";

export default {
  components: { PencilIcon },
  data() {
    return {
      dictionaries: [
        { name: "Foo", id: "123" },
        { name: "Bar", id: "345" },
      ],
    };
  },
};
</script>

<template>
  <main class="bg-zinc-900 text-gray-100 text-left py-10">
    <div class="flex flex-col mx-4 md:max-w-2xl lg:max-w-6xl md:mx-auto">
      <div class="flex justify-between">
        <h1 class="text-2xl">Dashboard</h1>
        <RouterLink
          to="/new-dictionary"
          class="text-sm bg-indigo-500/[0.05] border-2 text-pink-500 border-pink-500 hover:text-purple-500 hover:border-purple-500 font-bold py-2 px-4 rounded hover:cursor-pointer disabled:cursor-not-allowed"
        >
          Add Dictionary
        </RouterLink>
      </div>
      <section class="my-8 bg-zinc-800 rounded-md">
        <p class="bg-zinc-900/[0.30] text-gray-200 py-2 px-4 rounded-t-md">
          Dictionaries
        </p>
        <ul>
          <li
            class="flex justify-between px-4 py-2 text-gray-200 hover:bg-zinc-700/[0.25]"
            v-for="item in dictionaries"
            :key="item.id"
          >
            <span class="hover:underline hover:cursor-pointer">
              {{ item.name }}</span
            >
            <button
              class="flex text-xs text-zinc-400 hover:text-zinc-300 items-center gap-2 bg-zinc-700/[0.55] hover:bg-zinc-700/[0.65] rounded-md px-2"
            >
              <PencilIcon class="h-3 w-3" /> Edit
            </button>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
