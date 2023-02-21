import type { DictionaryWord } from "@/models/DictionaryPage";
import { serializeString, deserializeString } from "@/helpers/stringSerializer";

const generateText = (
  textToReplace: string,
  wordSet: Array<DictionaryWord>
) => {
  let textWithUnicodeEmoji = serializeString(textToReplace);

  for (const { word, alternatives } of wordSet) {
    console.log("🚀 ~ file: generateText.ts:11 ~ alternatives:", alternatives);
    console.log("🚀 ~ file: generateText.ts:11 ~ word:", word);
    textWithUnicodeEmoji = textWithUnicodeEmoji.replace(
      word,
      `[${alternatives[0]}]`
    );
  }

  const textWithEmojii = deserializeString(textWithUnicodeEmoji);
  return (
    '<div v-html="rawHtml">' +
    textWithEmojii.replace(
      /\[(.*?)\]/g,
      `<span v-html="rawHtml" class="mx-1 w-auto rounded bg-slate-300 px-2 text-zinc-900">$1</span>`
    ) +
    "</div>"
  );
};

export default generateText;
