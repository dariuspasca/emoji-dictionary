<script lang="ts">
import { ref } from "vue";
import { TrashIcon } from "@heroicons/vue/24/solid";
import AddWord from "@/components/AddWord.vue";
import type DictionaryWord from "@/models/DictionaryWord";

export default {
  components: { AddWord, TrashIcon },
  data() {
    return {
      name: ref(""),
      title: ref(""),
      description: ref(""),
      isLoading: false,
      showModal: false,
      words: new Array<DictionaryWord>(),
    };
  },
  methods: {
    hideModal() {
      this.showModal = false;
    },
    addWordToDictionary(newWord: DictionaryWord) {
      this.words = [...this.words, newWord];
      this.hideModal();
    },
    deleteWordFromDictionary(index: number) {
      this.words.splice(index, 1);
    },
  },
  computed: {
    getUniqueWords() {
      return this.words.map(({ word }) => word);
    },
  },
  watch: {
    name(newVal) {
      this.name = newVal.toLowerCase();
    },
  },
};
</script>

<template>
  <main class="bg-zinc-900">
    <div class="mx-8 md:max-w-3xl md:mx-auto pt-10 md:pt-40">
      <form class="flex flex-col pb-8 md:pb-0">
        <h1
          class="text-5xl mb-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        >
          > Create a new dictionary
        </h1>

        <section>
          <h2 class="font-medium text-xl text-gray-300 mb-4">
            Let's get started!
          </h2>
          <div
            class="flex flex-col md:flex-row gap-1 md:gap-10 md:items-center mb-4"
          >
            <label for="name" class="text-gray-200 md:w-64 mb-2 md:mb-0"
              >Dictionary name</label
            >
            <input
              class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400 text-gray-200"
              type="text"
              placeholder="Give an unique name to your dictionary"
              v-model="name"
            />
          </div>
        </section>

        <section class="py-4 md:py-10">
          <h2 class="font-medium text-xl text-gray-300 mb-4">Customize</h2>
          <div
            class="flex flex-col md:flex-row gap-1 md:gap-10 md:items-center mb-2"
          >
            <label for="name" class="text-gray-200 md:w-64 mb-2 md:mb-0"
              >Title</label
            >
            <input
              class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400 text-gray-200"
              type="text"
              placeholder="Dictionary page description"
              v-model="title"
            />
          </div>
          <div
            class="flex flex-col md:flex-row gap-1 md:gap-10 md:items-center mb-4"
          >
            <label for="name" class="text-gray-200 md:w-64 mb-2 md:mb-0"
              >Description</label
            >
            <input
              class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400 text-gray-200"
              type="text"
              placeholder="Dictionary page description"
              v-model="description"
            />
          </div>
        </section>

        <section class="py-10">
          <h2 class="font-medium text-xl text-gray-300 mb-4">Your words</h2>
          <ul>
            <li
              class="flex justify-between px-4 py-2 text-gray-200 hover:bg-zinc-700/[0.25]"
              v-for="(item, index) in words"
              :key="item.word"
            >
              <span class="w-4/12"> {{ item.word }}</span>
              <span class="w-4/12"> {{ item.alternatives.join(",") }}</span>
              <button
                class="flex text-xs text-zinc-400 hover:text-zinc-300 items-center gap-2 bg-zinc-700/[0.55] hover:bg-zinc-700/[0.65] rounded-md px-2"
                @click="deleteWordFromDictionary(index)"
              >
                <TrashIcon class="h-3 w-3" /> Delete
              </button>
            </li>
          </ul>
          <button
            type="button"
            class="my-4 md:w-64 border-2 text-gray-400 hover:text-gray-300 border-gray-500 hover:border-gray-400 font-bold text-sm py-2 px-8 rounded"
            @click="showModal = true"
          >
            Add word
          </button>
        </section>

        <input
          type="submit"
          class="mx-auto w-full md:w-96 bg-indigo-500/[0.05] border-2 text-pink-500 border-pink-500 hover:text-purple-500 hover:border-purple-500 font-bold py-2 px-4 rounded hover:cursor-pointer disabled:cursor-not-allowed"
          :value="isLoading ? 'Loading' : 'Create'"
          :disabled="isLoading"
        />
      </form>
    </div>
    <AddWord
      :show="showModal"
      :uniqueWords="getUniqueWords"
      @closeModal="showModal = false"
      @newWord="addWordToDictionary"
    />
  </main>
</template>
