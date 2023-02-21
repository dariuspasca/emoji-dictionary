import type { DictionaryWord } from "@/models/DictionaryPage";
import { serializeString, deserializeString } from "@/helpers/stringSerializer";

const serializeEntries = (entries: Array<DictionaryWord>) =>
  entries.map(({ word, alternatives }) => ({
    word: serializeString(word),
    alternatives: alternatives.map((alternative) =>
      serializeString(alternative)
    ),
  }));

const deserializeEntries = (entries: Array<DictionaryWord>) =>
  entries.map(({ word, alternatives }) => ({
    word: deserializeString(word),
    alternatives: alternatives.map((alternative) =>
      deserializeString(alternative)
    ),
  }));

export { serializeEntries, deserializeEntries };
