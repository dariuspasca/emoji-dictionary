interface DictionaryWord {
  word: string;
  alternatives: Array<string>;
}

interface Dictionary {
  name: string;
  title: string;
  description: string;
  entries: Array<DictionaryWord> | string;
}

interface DictionaryPage extends Dictionary {
  id: string;
  user_id: string;
}

export type { Dictionary, DictionaryWord, DictionaryPage };
