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
  },
  data() {
    return {
      word: ref(""),
      alternatives: ref(""),
    };
  },
  methods: {
    addNewWord() {
      const newWord: DictionaryWord = {
        word: this.word,
        alternatives: [this.alternatives],
      };

      this.$emit("newWord", newWord);
    },
  },
};
</script>

<template>
  <Teleport to="body">
    <modal :show="show">
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <h3 class="font-medium text-lg text-zinc-800">Add a new word</h3>
          <button role="button" @click="$emit('closeModal')">
            <XMarkIcon class="h-6 w-6 text-pink-500" />
          </button>
        </div>
      </template>
      <template #body>
        <div class="flex gap-10 items-center">
          <label for="name" class="text-zinc-800 font-medium">Replace</label>
          <input
            class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-stone-100 border-zinc-400 placeholder-zinc-500 text-zinc-700"
            type="text"
            placeholder="Your emojii/word"
            v-model="word"
          />
        </div>
        <div class="flex gap-10 items-center">
          <label for="name" class="text-zinc-800 font-medium">Replace</label>
          <input
            class="shadow flex-grow appearance-none border rounded py-2 px-3 bg-stone-100 border-zinc-400 placeholder-zinc-500 text-zinc-700"
            type="text"
            placeholder="Replace with"
            v-model="alternatives"
          />
        </div>
      </template>
      <template #footer>
        <button
          type="button"
          class="w-full border-2 text-gray-200 bg-zinc-800 hover:bg-zinc-900/[0.95] font-bold text-sm py-2 px-8 rounded"
          @click="addNewWord"
        >
          Add word
        </button>
      </template>
    </modal>
  </Teleport>
</template>
