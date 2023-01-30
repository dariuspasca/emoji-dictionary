<script lang="ts">
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import Modal from "@/components/Modal.vue";
import type DictionaryWord from "@/models/DictionaryWord";

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
      containsSameWord: false,
    };
  },
  watch: {
    word(newVal) {
      this.wordAlreadyExists = this.uniqueWords?.includes(newVal);
    },
    alternatives(newVal) {
      this.containsSameWord = this.word === newVal;
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
  },
};
</script>

<template>
  <Teleport to="body">
    <modal :show="show">
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <h3 class="font-medium text-lg text-white">Add a new word</h3>
          <button role="button" @click="$emit('closeModal')">
            <XMarkIcon class="h-6 w-6 text-indigo-500" />
          </button>
        </div>
      </template>
      <template #body>
        <div
          class="flex flex-col md:flex-row gap-1 md:gap-10 md:items-center mb-4"
        >
          <label for="name" class="text-stone-100 font-medium md:w-2/12"
            >Word</label
          >
          <input
            class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400 text-gray-200"
            type="text"
            placeholder="Your emojii/word"
            v-model="word"
          />
        </div>
        <p v-if="wordAlreadyExists" class="text-pink-500 text-sm mt-2 mb-6">
          Word already added, try with a different one pretty please
        </p>
        <div class="flex flex-col md:flex-row gap-1 md:gap-10 md:items-center">
          <label for="name" class="text-stone-100 font-medium md:w-2/12"
            >Replace</label
          >
          <input
            class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-zinc-800 border-zinc-600 placeholder-stone-400 text-gray-200"
            type="text"
            placeholder="Replace with"
            v-model="alternatives"
          />
        </div>
        <p v-if="containsSameWord" class="text-pink-500 text-sm mt-2">
          Can't replace a word with the same word, what you say?
        </p>
      </template>
      <template #footer>
        <button
          type="button"
          class="w-full mt-4 border-2 text-gray-200 bg-zinc-800 hover:bg-zinc-900/[0.95] font-bold text-sm py-2 px-8 rounded"
          :disabled="isAddButtonDisabled"
          @click="addNewWord"
        >
          Add word
        </button>
      </template>
    </modal>
  </Teleport>
</template>
