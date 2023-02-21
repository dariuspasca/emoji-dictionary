import { defineStore, storeToRefs } from "pinia";
import { supabase } from "@/helpers/supabase";
import {
  serializeEntries,
  deserializeEntries,
} from "@/helpers/entriesSerializer";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import type { DictionaryPage, Dictionary } from "@/models/DictionaryPage";
import type SupabaseError from "@/models/SupabaseError";
import { notify } from "@/helpers/notiwind";
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
      if (data.length) {
        dictionaries.value = data.map((dictionary) => ({
          ...dictionary,
          entries: deserializeEntries(JSON.parse(dictionary.entries)),
        }));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
        notify(
          {
            group: "bottom",
            title: "Error",
            text: "Ops, something unexpected happened",
            type: "error",
          },
          2000
        );
      }
    } finally {
      isLoading.value = false;
    }
  };

  const createDictionary = async (newDictionary: Dictionary) => {
    try {
      isLoading.value = true;
      const { data, error } = await supabase
        .from("dictionary")
        .insert({
          ...newDictionary,
          user_id: user.value?.id,
          entries: JSON.stringify(serializeEntries(newDictionary.entries)),
        })
        .select();

      if (error) throw error;
      if (data.length) {
        dictionaries.value = data;
        router.push(`/dashboard`);
        notify(
          {
            group: "bottom",
            title: "Success",
            text: "New dictionary created",
            type: "success",
          },
          2000
        );
      }
    } catch (error) {
      const err = error as SupabaseError;
      if (err.code === "23505") {
        notAvailablePageNames.value = [
          ...notAvailablePageNames.value,
          newDictionary.name,
        ];
      } else if (err.code === "23514") {
        notify(
          {
            group: "bottom",
            title: "Error",
            text: "Dictionary name should be at least 3 characters",
            type: "error",
          },
          2000
        );
      }
    } finally {
      isLoading.value = false;
    }
  };

  const updateDictionary = async (updateDictionary: Dictionary) => {
    try {
      isLoading.value = true;
      const { data, error } = await supabase
        .from("dictionary")
        .update({
          ...updateDictionary,
          entries: JSON.stringify(serializeEntries(updateDictionary.entries)),
        })
        .eq("user_id", user.value?.id)
        .select();

      if (error) throw error;
      if (data.length) {
        const newDictionary = data[0];
        dictionaries.value = dictionaries.value!.map((dictionary) =>
          dictionary.id === newDictionary.id
            ? {
                ...newDictionary,
                entries: deserializeEntries(JSON.parse(newDictionary.entries)),
              }
            : dictionary
        );
        notify(
          {
            group: "bottom",
            title: "Success",
            text: "Dictionary updated",
            type: "success",
          },
          2000
        );
      }
    } catch (error) {
      const err = error as SupabaseError;
      if (err.code === "23505") {
        notAvailablePageNames.value = [
          ...notAvailablePageNames.value,
          updateDictionary.name,
        ];
      } else if (err.code === "23514") {
        notify(
          {
            group: "bottom",
            title: "Error",
            text: "Dictionary name should be at least 3 characters",
            type: "error",
          },
          2000
        );
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
      notify(
        {
          group: "bottom",
          title: "Success",
          text: "Dictionary deleted",
          type: "success",
        },
        2000
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
        notify(
          {
            group: "bottom",
            title: "Error",
            text: "Ops, something unexpected happened",
            type: "error",
          },
          2000
        );
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
