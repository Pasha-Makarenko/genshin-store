import { create } from "zustand"
import { UseStore } from "@/models/store"
import { Character } from "@/models/characters"
import Store from "@/store/store"
import CharacterAPI from "@/services/characters"

export const useCharacters = create<UseStore<Character>>(
  (setState, getState) => {
    const store = new Store<Character>(CharacterAPI, setState, getState)

    return {
      ...store.initialState,
      getItemByID: store.getItemByID,
      getItems: store.getItems,
      getAllItemsID: store.getAllItemsID,
      clearItems: store.clearItems,
    }
  }
)
