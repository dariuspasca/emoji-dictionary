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
      class="fixed top-0 left-0 w-full h-full flex z-50 bg-zinc-900/[0.85] transition-opacity"
    >
      <div
        class="transition-all m-auto bg-zinc-800 w-10/12 md:w-[500px] px-6 py-4 rounded-md shadow-md shadow-purple-500/[0.55]"
      >
        <div class="text-white">
          <slot name="header">default header</slot>
        </div>

        <div class="my-4">
          <slot name="body">default body</slot>
        </div>

        <div class="mt-4">
          <slot name="footer">
            default footer
            <button class="float-right" @click="$emit('close')">OK</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
