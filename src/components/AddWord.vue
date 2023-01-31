<script lang="ts">
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import Modal from "@/components/Modal.vue";
import type { DictionaryWord } from "@/models/DictionaryPage";

export default {
  id: "AddWord",
  components: { Modal, XMarkIcon },
  emits: ["newWord", "closeModal"],
  props: {
    show: Boolean,
    uniqueWords: { required: true, type: Array<string> },
  },
  data() {
    return {
      word: ref(""),
      alternatives: ref(""),
      wordAlreadyExists: false,
    };
  },
  watch: {
    word(newVal) {
      this.wordAlreadyExists = this.uniqueWords?.includes(newVal);
    },
  },
  methods: {
    addNewWord() {
      const newWord: DictionaryWord = {
        word: this.word,
        alternatives: [this.alternatives],
      };

      this.$emit("newWord", newWord);
      this.initModal();
    },
    initModal() {
      this.word = "";
      this.alternatives = "";
      this.wordAlreadyExists = false;
    },
  },
  computed: {
    isAddButtonDisabled() {
      return !this.word || this.wordAlreadyExists || !this.alternatives;
    },
    isAlternativeSameWord() {
      return this.word === this.alternatives && this.alternatives !== "";
    },
  },
};
</script>

<template>
  <Teleport to="body">
    <modal :show="show">
      <template #header>
        <div class="flex flex-row items-center justify-between">
          <h3 class="text-lg font-medium text-white">Add a new word</h3>
          <button role="button" @click="$emit('closeModal')">
            <XMarkIcon class="h-6 w-6 text-indigo-500" />
          </button>
        </div>
      </template>
      <template #body>
        <div
          class="mb-4 flex flex-col gap-1 md:flex-row md:items-center md:gap-10"
        >
          <label for="name" class="font-medium text-stone-100 md:w-2/12"
            >Word</label
          >
          <input
            class="flex-grow appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400 shadow"
            type="text"
            placeholder="Your emojii/word"
            v-model="word"
          />
        </div>
        <p v-if="wordAlreadyExists" class="mt-2 mb-6 text-sm text-pink-500">
          Word already added, try with a different one pretty please
        </p>
        <div class="flex flex-col gap-1 md:flex-row md:items-center md:gap-10">
          <label for="name" class="font-medium text-stone-100 md:w-2/12"
            >Replace</label
          >
          <input
            class="flex-grow appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400 shadow"
            type="text"
            placeholder="Replace with"
            v-model="alternatives"
          />
        </div>
        <p v-if="isAlternativeSameWord" class="mt-2 text-sm text-pink-500">
          Can't replace a word with the same word, what you say?
        </p>
      </template>
      <template #footer>
        <button
          type="button"
          class="mt-4 w-full rounded border-2 bg-zinc-800 py-2 px-8 text-sm font-bold text-gray-200 hover:bg-zinc-900/[0.95]"
          :disabled="isAddButtonDisabled"
          @click="addNewWord"
        >
          Add word
        </button>
      </template>
    </modal>
  </Teleport>
</template>
