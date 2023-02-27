<script lang="ts">
import { useProfileStore } from "@/store/profile";
import { storeToRefs } from "pinia";
import DictionaryForm from "@/components/DictionaryForm.vue";

export default {
  components: { DictionaryForm },
  setup() {
    const profileStore = useProfileStore();
    const { dictionaries } = storeToRefs(profileStore);
    const { getDictionaries } = profileStore;

    return {
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
  <main class="mx-4 text-left text-gray-100 md:mx-auto md:max-w-xl">
    <div v-if="dictionary" class="mx-4">
      <DictionaryForm :dictionary="dictionary" is-edit-mode />
    </div>
    <div v-else class="container mx-auto mt-20 text-center">
      <h1 class="mb-8 text-xl font-medium text-gray-300">
        Dictionary not found :(
      </h1>
      <RouterLink
        class="mx-auto w-full rounded border-2 border-pink-500 bg-indigo-500/[0.05] py-2 px-4 font-bold text-pink-500 hover:cursor-pointer hover:border-purple-500 hover:text-purple-500 disabled:cursor-not-allowed md:w-96"
        to="/dashboard"
        >Go to Dashboard</RouterLink
      >
    </div>
  </main>
</template>
