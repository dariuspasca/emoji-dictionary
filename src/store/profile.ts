import { defineStore, storeToRefs } from "pinia";
import { supabase } from "@/helpers/supabase";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import type { DictionaryPage, Dictionary } from "@/models/DictionaryPage";
import type SupabaseError from "@/models/SupabaseError";
import router from "@/router";

export const useProfileStore = defineStore("profile", () => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const dictionaries = ref<Array<DictionaryPage> | null>(null);
  const notAvailablePageNames = ref(new Array<string>());
  const isLoading = ref(false);

  const getDictionaries = async () => {
    try {
      isLoading.value = true;
      const { data, error } = await supabase
        .from("dictionary")
        .select("*")
        .eq("user_id", user.value?.id);
      if (error) throw error;
      if (data) {
        dictionaries.value = data.map((dictionary) => ({
          ...dictionary,
          entries: JSON.parse(dictionary.entries),
        }));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const createDictionary = async (newDictionary: Dictionary) => {
    try {
      const { data, error } = await supabase
        .from("dictionary")
        .insert({
          ...newDictionary,
          user_id: user.value?.id,
          entries: JSON.stringify(newDictionary.entries),
        })
        .select();

      if (error) throw error;
      if (data) {
        dictionaries.value = data;
        router.push(`/dashboard`);
      }
    } catch (error) {
      const err = error as SupabaseError;
      if (err.code === "23505") {
        notAvailablePageNames.value = [
          ...notAvailablePageNames.value,
          newDictionary.name,
        ];
      } else if (err.code === "23514") {
        console.log("name too short");
      }
    } finally {
      isLoading.value = false;
    }
  };

  const updateDictionary = async (updateDictionary: Dictionary) => {
    try {
      const { data, error } = await supabase
        .from("dictionary")
        .update({
          ...updateDictionary,
          entries: JSON.stringify(updateDictionary.entries),
        })
        .eq("user_id", user.value?.id)
        .select();

      if (error) throw error;
      if (data) {
        const updatedDictionary = data[0] as DictionaryPage;
        dictionaries.value = dictionaries.value!.map((dictionary) =>
          dictionary.id === updatedDictionary.id
            ? { ...updatedDictionary }
            : dictionary
        );
        router.push(`/dashboard`);
      }
    } catch (error) {
      const err = error as SupabaseError;
      if (err.code === "23505") {
        notAvailablePageNames.value = [
          ...notAvailablePageNames.value,
          updateDictionary.name,
        ];
      } else if (err.code === "23514") {
        console.log("name too short");
      }
    } finally {
      isLoading.value = false;
    }
  };

  const deleteDictionary = async (id: string) => {
    const tempDictionary = dictionaries.value;
    try {
      dictionaries.value = dictionaries.value!.filter(
        (dictionary) => dictionary.id !== id
      );
      const { error } = await supabase.from("dictionary").delete().eq("id", id);

      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
      dictionaries.value = tempDictionary;
    } finally {
      isLoading.value = false;
    }
  };

  const editDictionary = (name: string) => {
    router.push(`/edit-dictionary/${name}`);
  };

  return {
    dictionaries,
    isLoading,
    notAvailablePageNames,
    getDictionaries,
    createDictionary,
    updateDictionary,
    editDictionary,
    deleteDictionary,
  };
});
