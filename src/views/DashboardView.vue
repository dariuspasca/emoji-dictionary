<script lang="ts">
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { useProfileStore } from "@/store/profile";
import { storeToRefs } from "pinia";

export default {
  components: { PencilIcon, TrashIcon },
  setup() {
    const profileStore = useProfileStore();
    const { isLoading, dictionaries } = storeToRefs(profileStore);
    const { getDictionaries, editDictionary, deleteDictionary } = profileStore;
    return {
      dictionaries,
      isLoading,
      getDictionaries,
      editDictionary,
      deleteDictionary,
    };
  },
  mounted() {
    this.getDictionaries();
  },
};
</script>

<template>
  <main class="py-4 text-left text-gray-100">
    <div class="mx-4 flex flex-col md:mx-auto md:max-w-2xl lg:max-w-6xl">
      <div class="flex justify-between">
        <h1 class="text-2xl">Dashboard</h1>
        <RouterLink
          to="/new-dictionary"
          class="rounded border-2 border-pink-500 bg-indigo-500/[0.05] py-2 px-4 text-sm font-bold text-pink-500 hover:cursor-pointer hover:border-purple-500 hover:text-purple-500 disabled:cursor-not-allowed"
        >
          Add Dictionary
        </RouterLink>
      </div>
      <section class="my-8 rounded-md bg-zinc-800">
        <p class="rounded-t-md bg-zinc-900/[0.30] py-2 px-4 text-gray-200">
          Dictionaries
        </p>
        <ul>
          <li
            class="flex justify-between px-4 py-2 text-gray-200 hover:bg-zinc-700/[0.25]"
            v-for="dictionary in dictionaries"
            :key="dictionary.id"
          >
            <RouterLink
              class="hover:cursor-pointer hover:underline"
              :to="'/dictionary/' + dictionary.name"
            >
              {{ dictionary.name }}</RouterLink
            >

            <div class="flex gap-2">
              <RouterLink
                :to="'/edit-dictionary/' + dictionary.name"
                class="flex items-center gap-2 rounded-md bg-zinc-700/[0.55] px-2 text-xs text-zinc-400 hover:bg-zinc-700/[0.65] hover:text-zinc-300"
              >
                <PencilIcon class="h-3 w-3" /> Edit
              </RouterLink>
              <button
                class="flex items-center gap-2 rounded-md bg-zinc-700/[0.55] px-2 text-xs text-zinc-400 hover:bg-zinc-700/[0.65] hover:text-pink-500"
                @click="deleteDictionary(dictionary.id)"
              >
                <TrashIcon class="h-3 w-3" /> Delete
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
