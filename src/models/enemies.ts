import { Rarity, Region, Vision } from "@/models/global"

export type EnemiesType = "Common Enemies" | "Elite Enemies" | "Unique Enemies"
export type EnemiesFamily =
  | "The Abyss"
  | "Mystical Beasts"
  | "Fatui"
  | "Hilichurls"
  | "Other Human Factions"
  | "Slime"
  | "Automatons"
  | "Treasure Hoarders"
  | "Unique Enemies"
export type EnemiesFaction =
  | "Abyss Order"
  | "Fatui"
  | "Humanoid Ruin Machines"
  | "Ruin Drakes"
  | "Primal Constructs'Primal Constructs"

export interface ChurlsEnemy {
  id: string
  name: string
  description: string
  region: Region
}

export interface FatuiEnemy {
  id: string
  name: string
  type: "Legionnaire" | "Bracer" | "Vanguard"
  element: Vision
}

export interface Enemy {
  id: string
  name: string
  region: Region
  type: EnemiesType
  family: EnemiesFamily
  faction?: EnemiesFaction
  title?: string
  element?: Array<Vision | "N/A">
  elements?: Array<Vision | "N/A">
  "mora-gained"?: number | "None"
  description?: string | "N/A"
  descriptions?: Array<{
    name: string
    description: string
  }>
  "elemental-description"?: Array<{
    element: Vision
    description: string
  }>
  "elemental-descriptions"?: Array<{
    element: Vision
    description: string
  }>
  artifacts?: Array<{
    name: string
    set: string
    rarity: `${Rarity}` | `${Rarity}/${Rarity}`
  }>
  drops?:
    | Array<{
        name: string
        rarity: Rarity
        "minimum-level": number
      }>
    | "None"
  "ice-shieldwall-mitachurl"?: ChurlsEnemy
  "blazing-axe-mitachurl"?: ChurlsEnemy
  "crackling-axe-mitachurl"?: ChurlsEnemy
  "rock-shieldwall-mitachurl"?: ChurlsEnemy
  "wooden-shieldwall-mitachurl"?: ChurlsEnemy
  "frostarm-lawachurl"?: ChurlsEnemy
  "stonehide-lawachurl"?: ChurlsEnemy
  "hydrogunner-legionnaire"?: FatuiEnemy
  "cryogunner-legionnaire"?: FatuiEnemy
  "geochanter-bracers"?: FatuiEnemy
  "pyroslinger-bracers"?: FatuiEnemy
  "anemoboxer-vanguard"?: FatuiEnemy
  "electrohammer-vanguard"?: FatuiEnemy
  urls: {
    portrait?: string
    fandom: string
  }
}
