<script lang="ts">
import { useProfileStore } from "@/store/profile";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const profileStore = useProfileStore();
    const { isLoading, dictionaries } = storeToRefs(profileStore);
    const { getDictionaries } = profileStore;

    return {
      isLoading,
      dictionaries,
      getDictionaries,
    };
  },
  computed: {
    dictionary() {
      return this.dictionaries?.find(
        (dictionary) => dictionary.name === this.$route.params.name
      );
    },
  },
  mounted() {
    if (!this.dictionaries) {
      this.getDictionaries();
    }
  },
};
</script>

<template>
  <main class="bg-zinc-900 py-10 text-left text-gray-100">
    <div>Dictionary</div>
  </main>
</template>
