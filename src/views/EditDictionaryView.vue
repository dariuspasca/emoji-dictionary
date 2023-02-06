<script lang="ts">
import { useProfileStore } from "@/store/profile";
import { storeToRefs } from "pinia";
import DictionaryForm from "@/components/DictionaryForm.vue";

export default {
  components: { DictionaryForm },
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
    <div v-if="isLoading">Loading</div>
    <div v-else>
      <div v-if="dictionary">
        <DictionaryForm :dictionary="dictionary" is-edit-mode />
      </div>
      <div class="container mx-auto mt-20 text-center" v-else>
        <h1 class="mb-8 text-xl font-medium text-gray-300">
          Dictionary not found :(
        </h1>
        <RouterLink
          class="mx-auto w-full rounded border-2 border-pink-500 bg-indigo-500/[0.05] py-2 px-4 font-bold text-pink-500 hover:cursor-pointer hover:border-purple-500 hover:text-purple-500 disabled:cursor-not-allowed md:w-96"
          to="/dashboard"
          >Go to Dashboard</RouterLink
        >
      </div>
    </div>
  </main>
</template>
