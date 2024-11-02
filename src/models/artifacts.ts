import { Rarity } from "@/models/global"

export interface Artifact {
  id: string
  name: string
  max_rarity: Rarity
  "2-piece_bonus": string
  "4-piece_bonus": string
  urls: {
    "circlet-of-logos": string
    "flower-of-life": string
    "goblet-of-eonothem": string
    "plume-of-death": string
    "sands-of-eon": string
    fandom: string
  }
}
