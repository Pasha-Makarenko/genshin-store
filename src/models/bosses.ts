import { Rarity } from "@/models/global"

export interface Boss {
  id: string
  name: string
  description: string
  drops: Array<{
    name: string
    rarity: Rarity
    source: string
  }>
  artifacts: Array<{
    name: string
    max_rarity: Rarity
  }>
  urls: {
    icon: string
    portrait: string
    drops: {
      [ket: string]: string
    }
    fandom: string
  }
}
