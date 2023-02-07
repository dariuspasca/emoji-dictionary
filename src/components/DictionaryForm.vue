<script lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import { useProfileStore } from "@/store/profile";
import { storeToRefs } from "pinia";
import { TrashIcon } from "@heroicons/vue/24/solid";
import AddWord from "@/components/AddWord.vue";
import type {
  DictionaryPage,
  Dictionary,
  DictionaryWord,
} from "@/models/DictionaryPage";

export default {
  id: "DictionaryForm",
  components: { AddWord, TrashIcon },
  props: {
    dictionary: Object as PropType<DictionaryPage>,
    isEditMode: { required: false, type: Boolean, default: false },
  },
  setup() {
    const profileStore = useProfileStore();
    const { isLoading, notAvailablePageNames } = storeToRefs(profileStore);
    const { createDictionary, updateDictionary } = profileStore;
    return {
      isLoading,
      notAvailablePageNames,
      createDictionary,
      updateDictionary,
    };
  },
  data() {
    return {
      name: ref(""),
      title: ref(""),
      description: ref(""),
      words: new Array<DictionaryWord>(),
      showModal: false,
    };
  },
  methods: {
    addWordToDictionary(newWord: DictionaryWord) {
      this.words = [...this.words, newWord];
      this.showModal = false;
    },
    deleteWordFromDictionary(index: number) {
      this.words.splice(index, 1);
    },
    submit() {
      const payload: Dictionary = {
        name: this.name,
        title: this.title,
        description: this.description,
        entries: this.words,
      };

      if (this.isEditMode) {
        this.updateDictionary(payload);
      } else {
        this.createDictionary(payload);
      }
    },
  },
  computed: {
    uniqueWords() {
      return this.words.map(({ word }) => word);
    },
    isPageNameUnique() {
      if (!this.notAvailablePageNames.length) {
        return true;
      }
      return !this.notAvailablePageNames.includes(this.name);
    },
    submitButtonName() {
      return this.isEditMode ? "Update" : "Create";
    },
    formTitle() {
      return this.isEditMode
        ? ": Update dictionary"
        : "> Create a new dictionary";
    },
  },
  watch: {
    name(newVal) {
      this.name = newVal.toLowerCase();
    },
  },
  mounted() {
    if (this.dictionary) {
      this.name = this.dictionary.name;
      this.title = this.dictionary.title;
      this.description = this.dictionary.description;
      this.words = this.dictionary.entries;
    }
  },
};
</script>

<template>
  <main class="bg-zinc-900">
    <div class="mx-8 pt-10 md:mx-auto md:max-w-2xl lg:max-w-3xl">
      <form class="flex flex-col pb-8 md:pb-0" @submit.prevent="submit">
        <h1
          class="mb-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent"
        >
          {{ formTitle }}
        </h1>

        <section>
          <h2 class="mb-4 text-xl font-medium text-gray-300">
            Let's get started!
          </h2>
          <div
            class="mb-4 flex flex-col gap-1 md:flex-row md:items-center md:gap-10"
          >
            <label for="name" class="mb-2 text-gray-200 md:mb-0 md:w-64"
              >Dictionary name</label
            >
            <input
              class="flex-grow appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400 shadow"
              type="text"
              minlength="3"
              required
              placeholder="Give an unique name to your dictionary"
              v-model.trim="name"
            />
          </div>
          <p v-if="!isPageNameUnique" class="mt-2 text-sm text-pink-500">
            Ops, there is already a dictionary with this name
          </p>
        </section>

        <section class="py-4 md:py-10">
          <h2 class="mb-4 text-xl font-medium text-gray-300">Customize</h2>
          <div
            class="mb-2 flex flex-col gap-1 md:flex-row md:items-center md:gap-10"
          >
            <label for="name" class="mb-2 text-gray-200 md:mb-0 md:w-64"
              >Title</label
            >
            <input
              class="flex-grow appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400 shadow"
              type="text"
              placeholder="Dictionary page description"
              v-model="title"
            />
          </div>
          <div
            class="mb-4 flex flex-col gap-1 md:flex-row md:items-center md:gap-10"
          >
            <label for="name" class="mb-2 text-gray-200 md:mb-0 md:w-64"
              >Description</label
            >
            <input
              class="flex-grow appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400 shadow"
              type="text"
              placeholder="Dictionary page description"
              v-model="description"
            />
          </div>
        </section>

        <section class="py-10">
          <h2 class="mb-4 text-xl font-medium text-gray-300">Your words</h2>
          <ul>
            <li
              class="flex justify-between px-4 py-2 text-gray-200 hover:bg-zinc-700/[0.25]"
              v-for="(item, index) in words"
              :key="item.word"
            >
              <span class="w-4/12"> {{ item.word }}</span>
              <span class="w-4/12 text-purple-500">
                {{ item.alternatives.join(",") }}</span
              >
              <button
                class="flex items-center gap-2 rounded-md bg-zinc-700/[0.55] px-2 text-xs text-zinc-400 hover:bg-zinc-700/[0.65] hover:text-zinc-300"
                @click="deleteWordFromDictionary(index)"
              >
                <TrashIcon class="h-3 w-3" /> Delete
              </button>
            </li>
          </ul>
          <button
            type="button"
            class="my-4 rounded border-2 border-gray-500 py-2 px-8 text-sm font-bold text-gray-400 hover:border-gray-400 hover:text-gray-300 md:w-64"
            @click="showModal = true"
          >
            Add word
          </button>
        </section>

        <input
          type="submit"
          class="mx-auto w-full rounded border-2 border-pink-500 bg-indigo-500/[0.05] py-2 px-4 font-bold text-pink-500 hover:cursor-pointer hover:border-purple-500 hover:text-purple-500 disabled:cursor-not-allowed md:w-96"
          :value="isLoading ? 'Loading' : submitButtonName"
          :disabled="isLoading"
        />
      </form>
    </div>
    <AddWord
      :show="showModal"
      :uniqueWords="uniqueWords"
      @closeModal="showModal = false"
      @newWord="addWordToDictionary"
    />
  </main>
</template>
