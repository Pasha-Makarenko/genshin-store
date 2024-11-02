import { create } from "zustand"
import { UseStore } from "@/models/store"
import { Enemy } from "@/models/enemies"
import Store from "@/store/store"
import EnemyAPI from "@/services/enemies"

export const useEnemies = create<UseStore<Enemy>>((setState, getState) => {
  const store = new Store<Enemy>(EnemyAPI, setState, getState)

  return {
    ...store.initialState,
    getItemByID: store.getItemByID,
    getItems: store.getItems,
    getAllItemsID: store.getAllItemsID,
    clearItems: store.clearItems,
  }
})
