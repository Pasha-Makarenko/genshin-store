import { create } from "zustand/index"
import { UseStore } from "@/models/store"
import { Weapon } from "@/models/weapons"
import Store from "@/store/store"
import WeaponAPI from "@/services/weapons"

export const useWeapons = create<UseStore<Weapon>>((setState, getState) => {
  const store = new Store<Weapon>(WeaponAPI, setState, getState)

  return {
    ...store.initialState,
    getItemByID: store.getItemByID,
    getItems: store.getItems,
    getAllItemsID: store.getAllItemsID,
    clearItems: store.clearItems,
  }
})
