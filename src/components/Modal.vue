<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
export default {
  props: {
    show: Boolean,
  },
};
</script>

<template>
  <Transition name="modal">
    <div
      v-if="show"
      class="fixed top-0 left-0 z-30 flex h-full w-full bg-zinc-900/[0.85] transition-opacity"
    >
      <div
        class="m-auto w-10/12 rounded-md bg-zinc-800 px-6 py-4 shadow-md shadow-purple-500/[0.55] transition-all md:mt-36 md:w-[500px]"
      >
        <div class="text-white">
          <slot name="header"></slot>
        </div>

        <div class="my-4">
          <slot name="body"></slot>
        </div>

        <div class="mt-4">
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
