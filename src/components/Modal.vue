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
      class="fixed top-0 left-0 w-full h-full flex z-50 bg-white/[0.05] transition-opacity"
    >
      <div
        class="transition-all m-auto bg-gray-100 w-[500px] px-6 py-4 rounded-md shadow-md shadow-zinc-500"
      >
        <div class="text-zinc-900">
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
