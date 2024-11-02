import { create } from "zustand"
import { BackgroundType } from "@/models/background"

export interface UseBackground {
  type: BackgroundType
  setType: (type: BackgroundType) => void
}

export const useBackground = create<UseBackground>(setState => ({
  type: "Home",
  setType: type => {
    setState({ type })
  },
}))
