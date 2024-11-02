import { create } from "zustand/index"
import { UseStore } from "@/models/store"
import { Boss } from "@/models/bosses"
import Store from "@/store/store"
import BossAPI from "@/services/bosses"

export const useBosses = create<UseStore<Boss>>((setState, getState) => {
  const store = new Store<Boss>(BossAPI, setState, getState)

  return {
    ...store.initialState,
    getItemByID: store.getItemByID,
    getItems: store.getItems,
    getAllItemsID: store.getAllItemsID,
    clearItems: store.clearItems,
  }
})
