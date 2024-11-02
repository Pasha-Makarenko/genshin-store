import { create } from "zustand/index"
import { UseStore } from "@/models/store"
import { Artifact } from "@/models/artifacts"
import Store from "@/store/store"
import ArtifactAPI from "@/services/artifacts"

export const useArtifacts = create<UseStore<Artifact>>((setState, getState) => {
  const store = new Store<Artifact>(ArtifactAPI, setState, getState)

  return {
    ...store.initialState,
    getItemByID: store.getItemByID,
    getItems: store.getItems,
    getAllItemsID: store.getAllItemsID,
    clearItems: store.clearItems,
  }
})
