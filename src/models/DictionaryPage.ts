import type DictionaryWord from "./DictionaryWord";

interface DictionaryPage {
  user_id: string;
  name: string;
  title: string;
  description: string;
  entries: Array<DictionaryWord> | string;
}

export default DictionaryPage;
