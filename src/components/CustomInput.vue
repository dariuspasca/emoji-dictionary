<script lang="ts">
import { ref } from "vue";
import type { InputHTMLAttributes } from "vue";
import type { PropType } from "vue";
import { FaceSmileIcon } from "@heroicons/vue/24/solid";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

export default {
  id: "CustomInput",
  components: { EmojiPicker, FaceSmileIcon },
  emits: ["update"],
  props: {
    inputProps: {
      required: true,
      type: Object as PropType<InputHTMLAttributes>,
    },
  },
  data() {
    return {
      input: ref(""),
      showEmojiPicker: false,
    };
  },
  methods: {
    clickListener(event: MouseEvent) {
      const isToggleButton = (event.target as HTMLElement)?.closest(
        "#toggle-picker"
      );
      const isOutside = !(event.target as HTMLElement)?.closest(
        ".v3-emoji-picker"
      );

      if (isOutside && !isToggleButton && this.showEmojiPicker) {
        this.showEmojiPicker = false;
      }
    },
    onSelect(emoji: { i: string; r: string; t: string; u: string; n: {} }) {
      this.showEmojiPicker = false;
      this.input = this.input + emoji.i;
    },
  },
  watch: {
    input(newInput) {
      this.$emit("update", newInput);
    },
  },
  mounted() {
    document.body.addEventListener("click", this.clickListener);
  },
  beforeUnmount() {
    document.body.removeEventListener("click", this.clickListener);
  },
};
</script>

<template>
  <div class="relative flex flex-grow">
    <input
      class="z-0 flex-grow appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400 shadow"
      v-bind="inputProps"
      v-model="input"
    />
    <button
      role="button"
      class="absolute right-2 top-2"
      id="toggle-picker"
      @click="showEmojiPicker = !showEmojiPicker"
    >
      <FaceSmileIcon class="h-6 w-6 text-zinc-500 hover:text-zinc-400" />
    </button>
    <EmojiPicker
      class="absolute right-2 top-10 z-10"
      theme="dark"
      :native="true"
      @select="onSelect"
      v-if="showEmojiPicker"
    />
  </div>
</template>
