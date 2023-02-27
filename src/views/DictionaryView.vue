<script lang="ts">
import { ref } from "vue";
import { supabase } from "@/helpers/supabase";
import {
  DocumentIcon,
  ClipboardDocumentIcon,
  ShareIcon,
} from "@heroicons/vue/24/solid";
import { notify } from "@/helpers/notiwind";
import type { DictionaryPage } from "@/models/DictionaryPage";
import DictionaryDetails from "@/components/DictionaryDetails.vue";
import generateText from "@/helpers/generateText";
import router from "@/router";

export default {
  components: {
    DocumentIcon,
    DictionaryDetails,
    ClipboardDocumentIcon,
    ShareIcon,
  },
  data() {
    return {
      dictionary: {} as DictionaryPage,
      isLoading: false,
      textToReplace: ref(""),
      textReplaced: "",
      textReplacedRaw: "",
      showModal: false,
    };
  },
  methods: {
    async setDictionary(name: string) {
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
          router.push("/404");
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
      const { formattedText, formattedHtmlText } = generateText(
        this.textToReplace,
        this.dictionary.entries
      );
      this.textReplacedRaw = formattedText;
      this.textReplaced = formattedHtmlText;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.textReplacedRaw).then(() => {
        notify(
          {
            group: "bottom",
            title: "Success",
            text: "Text copied",
            type: "success",
          },
          2000
        );
      });
    },
    async shareLink() {
      const shareData = {
        title: this.dictionaryTitle,
        text:
          this.dictionary.description ??
          "Emoji Dictionary: Replace words with other words 😯",
        url: `${window.location.href}${
          this.textReplacedRaw
            ? `?share=${this.textReplacedRaw.replace(/\s/g, "-")}`
            : ""
        }`,
      };

      if (this.webShareApiSupported) {
        try {
          await navigator.share(shareData);
          console.log("Article shared!");
        } catch (err) {
          console.error("Failed to share link with err", err);
          notify(
            {
              group: "bottom",
              title: "Error",
              text: "Ops, something went wrong",
              type: "error",
            },
            2000
          );
        }
      } else {
        navigator.clipboard.writeText(shareData.url).then(
          () => {
            notify(
              {
                group: "bottom",
                title: "Success",
                text: "Link copied to your clipboard",
                type: "success",
              },
              2000
            );
          },
          () => {
            notify(
              {
                group: "bottom",
                title: "Error",
                text: "Ops, something went wrong",
                type: "error",
              },
              2000
            );
          }
        );
      }
    },
  },
  computed: {
    dictionaryTitle(): string {
      return this.dictionary.title ?? `${this.dictionaryName} dictionary`;
    },
    dictionaryName(): string | string[] {
      return this.$route.params.name;
    },
    webShareApiSupported(): boolean {
      return !!navigator.canShare;
    },
  },
  mounted() {
    const name = this.dictionaryName;
    const share = this.$route.query.share;
    if (typeof name === "string") {
      this.setDictionary(name);
    }
    if (typeof share === "string") {
      this.textToReplace = share.replace(/-/g, " ");
    }
  },
};
</script>

<template>
  <main
    class="relative mt-4 flex h-[calc(100vh-100px)] flex-col text-left text-slate-100"
  >
    <div v-if="isLoading" class="mt-6 text-center text-lg">Loading ...</div>

    <div
      v-else
      class="mx-4 flex flex-grow flex-col items-start gap-2 md:mx-auto md:max-w-xl"
    >
      <h1
        class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-5xl font-extrabold text-transparent"
      >
        {{ dictionaryTitle }}
      </h1>
      <h2
        v-if="dictionary.description"
        class="mb-4 text-xl font-medium text-slate-300"
      >
        {{ dictionary.description }}
      </h2>

      <Transition name="fade" mode="out-in">
        <section class="mt-5 flex w-full flex-col gap-3" v-if="!textReplaced">
          <label
            for="textToReplace"
            class="text-slate-302 text-normal mb-2 text-slate-200 md:mb-0 md:w-64 lg:text-lg"
            >Insert your text</label
          >
          <textarea
            v-model="textToReplace"
            required
            rows="8"
            cols="33"
            class="h-56 w-full resize-none appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400"
          />
          <button
            type="button"
            class="my-5 mx-auto w-full rounded border-2 border-pink-500 bg-indigo-500/[0.05] py-2 px-4 font-bold text-pink-500 hover:cursor-pointer hover:border-purple-500 hover:text-purple-500 disabled:cursor-not-allowed"
            :disabled="!textToReplace"
            @click="replaceText"
          >
            Generate
          </button>
        </section>

        <section class="relative flex w-full flex-col gap-3" v-else>
          <h2
            class="text-slate-302 text-normal mb-2 text-slate-200 md:mb-0 md:w-64 lg:text-lg"
          >
            Your new text
          </h2>

          <div
            class="h-56 w-full resize-none appearance-none rounded border border-zinc-600 bg-zinc-800 py-2 px-3 text-gray-200 placeholder-stone-400"
          >
            <button
              class="float-right mt-1 flex items-center gap-1 rounded border border-zinc-600 py-1 px-2 text-xs text-zinc-200/[0.8] hover:bg-zinc-800/[0.8]"
              type="button"
              @click="copyToClipboard"
            >
              <ClipboardDocumentIcon class="h-3 w-3" />Copy
            </button>
            <div v-html="textReplaced" />
          </div>
          <button
            type="button"
            class="my-5 mx-auto w-full rounded border-2 border-pink-500 bg-indigo-500/[0.05] py-2 px-4 font-bold text-pink-500 hover:cursor-pointer hover:border-purple-500 hover:text-purple-500 disabled:cursor-not-allowed"
            @click="textReplaced = ''"
          >
            Try again
          </button>
        </section>
      </Transition>
    </div>
    <div class="flex justify-center gap-4" v-if="!isLoading">
      <button
        v-if="!isLoading"
        class="flex items-center gap-2 rounded border border-zinc-600 py-1 px-2 text-xs text-zinc-200/[0.8] hover:bg-zinc-800/[0.8]"
        type="button"
        @click="shareLink"
      >
        <ShareIcon class="h-3 w-3" />Share
      </button>
      <button
        class="flex items-center gap-2 rounded border border-zinc-600 py-1 px-2 text-xs text-zinc-200/[0.8] hover:bg-zinc-800/[0.8]"
        type="button"
        @click="showModal = true"
      >
        <DocumentIcon class="h-3 w-3" />Dictionary
      </button>
    </div>
  </main>
  <DictionaryDetails
    :show="showModal"
    :entries="dictionary.entries"
    @closeModal="showModal = false"
  />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
