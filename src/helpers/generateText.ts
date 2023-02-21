import type { DictionaryWord } from "@/models/DictionaryPage";
import { serializeString, deserializeString } from "@/helpers/stringSerializer";

const generateText = (
  textToReplace: string,
  wordSet: Array<DictionaryWord>
) => {
  let textWithUnicodeEmoji = serializeString(textToReplace);

  for (const { word, alternatives } of wordSet) {
    textWithUnicodeEmoji = textWithUnicodeEmoji.replace(
      word,
      `[${alternatives[0]}]`
    );
  }

  const rawText = deserializeString(textWithUnicodeEmoji);
  const formattedText =
    '<div v-html="rawHtml">' +
    rawText.replace(
      /\[(.*?)\]/g,
      `<span v-html="rawHtml" class="mx-1 w-auto rounded bg-slate-300 px-2 text-zinc-900">$1</span>`
    ) +
    "</div>";
  return { rawText, formattedText };
};

export default generateText;
