<script lang="ts">
import { ref } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import CustomInput from "./CustomInput.vue";
import Modal from "@/components/Modal.vue";
import type { DictionaryWord } from "@/models/DictionaryPage";

export default {
  id: "AddWord",
  components: { Modal, XMarkIcon, CustomInput },
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
    onChangeText(new_text: string | undefined) {
      this.word = new_text || "";
    },
    onChangeAlternatives(new_text: string | undefined) {
      this.alternatives = new_text || "";
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
          <h3 class="text-lg font-medium text-white">Add a new entry</h3>
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
          <CustomInput
            :input-props="{ type: 'text', placeholder: 'Your word/emoji' }"
            @update="onChangeText"
          />
        </div>
        <p v-if="wordAlreadyExists" class="mt-2 mb-6 text-sm text-pink-500">
          Word already added, try with a different one pretty please
        </p>
        <div class="flex flex-col gap-1 md:flex-row md:items-center md:gap-10">
          <label for="name" class="font-medium text-stone-100 md:w-2/12"
            >Replace</label
          >
          <CustomInput
            :input-props="{ type: 'text', placeholder: 'Replace with' }"
            @update="onChangeAlternatives"
          />
        </div>
        <p v-if="isAlternativeSameWord" class="mt-2 text-sm text-pink-500">
          Can't replace a word with the same word, what you say?
        </p>
      </template>
      <template #footer>
        <button
          type="button"
          class="mt-4 w-full cursor-pointer rounded border-2 bg-zinc-800 py-2 px-8 text-sm font-bold text-gray-200 hover:bg-zinc-900/[0.95] disabled:cursor-not-allowed"
          :disabled="isAddButtonDisabled"
          @click="addNewWord"
        >
          Add word
        </button>
      </template>
    </modal>
  </Teleport>
</template>
