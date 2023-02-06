<script lang="ts">
import { supabase } from "@/helpers/supabase";
import type { DictionaryPage } from "@/models/DictionaryPage";

export default {
  data() {
    return {
      dictionary: {} as DictionaryPage,
      isLoading: false,
      notFound: false,
    };
  },
  methods: {
    async getDictionary(name: string) {
      try {
        this.isLoading = true;
        const { data, error } = await supabase
          .from("dictionary")
          .select("*")
          .eq("name", name);
        if (error) throw error;
        if (data.length) {
          this.dictionary = data as unknown as DictionaryPage;
        } else {
          this.notFound = true;
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("Unexpected error", error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    const name = this.$route.params.name;
    if (typeof name === "string") {
      this.getDictionary(name);
    }
  },
};
</script>

<template>
  <main class="bg-zinc-900 py-10 text-left text-gray-100">
    <div v-if="isLoading">Loading</div>
    <div v-else-if="notFound">Not found</div>
    <div v-else>Dictionary</div>
  </main>
</template>
