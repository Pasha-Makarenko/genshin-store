import { Rarity } from "@/models/global"

export type WeaponType = "Sword" | "Bow" | "Claymore" | "Polearm" | "Catalyst"
export type WeaponTypeCapitalize =
  | "SWORD"
  | "BOW"
  | "CLAYMORE"
  | "POLEARM"
  | "CATALYST"

export interface Weapon {
  id: string
  name: string
  type: WeaponType
  rarity: Rarity
  baseAttack: number
  subStat: string
  passiveName: string
  passiveDesc: string
  location: string
  ascensionMaterial: string
  urls: {
    icon: string
    fandom: string
  }
}
