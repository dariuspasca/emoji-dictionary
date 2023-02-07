import type { DictionaryWord } from "@/models/DictionaryPage";

const generateText = (
  textToReplace: string,
  wordSet: Array<DictionaryWord>
) => {
  for (const { word, alternatives } of wordSet) {
    textToReplace = textToReplace.replace(
      new RegExp(`(^|\\s)${word}(\\s|$)`, "g"),
      `$1[${alternatives[0]}]$2`
    );
  }
  return (
    '<div v-html="rawHtml">' +
    textToReplace.replace(
      /\[(\w+)\]/g,
      `<span v-html="rawHtml" class="mx-1 w-auto rounded bg-slate-300 px-2 text-zinc-900">$1</span>`
    ) +
    "</div>"
  );
};

export default generateText;
