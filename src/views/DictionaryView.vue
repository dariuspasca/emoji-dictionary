<script lang="ts">
import { ref } from "vue";
import { supabase } from "@/helpers/supabase";
import type { DictionaryPage } from "@/models/DictionaryPage";
import generateText from "@/helpers/generateText";

export default {
  data() {
    return {
      dictionary: {} as DictionaryPage,
      isLoading: false,
      notFound: false,
      textToReplace: ref(
        "The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?"
      ),
      textReplaced: "",
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
          this.dictionary = {
            ...data[0],
            entries: JSON.parse(data[0].entries),
          };
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
    replaceText() {
      this.textReplaced = generateText(
        this.textToReplace,
        this.dictionary.entries
      );
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
    <div
      v-else
      class="mx-8 flex flex-col items-start gap-2 md:mx-auto md:max-w-xl md:pt-20"
    >
      <h1
        class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent"
      >
        {{ dictionary.title }}
      </h1>
      <h2 class="mb-4 text-xl font-medium text-gray-300">
        {{ dictionary.description }}
      </h2>

      <section class="flex w-full flex-col gap-3">
        <label for="textToReplace" class="mb-2 text-gray-200 md:mb-0 md:w-64"
          >Tell us your story:</label
        >
        <textarea
          v-model="textToReplace"
          required
          rows="5"
          cols="33"
          class="h-full w-full resize-none appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400"
        />
      </section>
      <button
        type="button"
        class="mx-auto my-20 w-full rounded border-2 border-pink-500 bg-indigo-500/[0.05] py-2 px-4 font-bold text-pink-500 hover:cursor-pointer hover:border-purple-500 hover:text-purple-500 disabled:cursor-not-allowed"
        @click="replaceText"
      >
        Generate
      </button>
      <section class="flex w-full flex-col gap-3">
        <p v-if="textReplaced" class="mb-2 text-gray-200 md:mb-0 md:w-64">
          Your new story
        </p>
        <div v-html="textReplaced" />
      </section>
    </div>
  </main>
</template>
