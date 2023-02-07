<script lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";
import Modal from "@/components/Modal.vue";
import type { DictionaryWord } from "@/models/DictionaryPage";

export default {
  id: "DictionaryDetails",
  components: { Modal, XMarkIcon },
  emits: ["closeModal"],
  props: {
    show: Boolean,
    entries: { required: true, type: Array<DictionaryWord> },
  },
};
</script>

<template>
  <Teleport to="body">
    <modal :show="show">
      <template #header>
        <div class="flex flex-row items-center justify-between">
          <h3 class="text-lg font-medium text-white">Dictionary Words</h3>
          <button role="button" @click="$emit('closeModal')">
            <XMarkIcon class="h-6 w-6 text-indigo-500" />
          </button>
        </div>
      </template>
      <template #body>
        <ul>
          <li
            class="flex justify-between px-4 py-2 text-gray-200 hover:bg-zinc-700/[0.25]"
            v-for="item in entries"
            :key="item.word"
          >
            <span class="w-6/12 text-left"> {{ item.word }}</span>
            <span class="w-6/12 text-right text-purple-500">
              {{ item.alternatives.join(",") }}</span
            >
          </li>
        </ul>
      </template>
      <template #footer> </template>
    </modal>
  </Teleport>
</template>
