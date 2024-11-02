import { Vision } from "@/models/global"
import { EnemiesType } from "@/models/enemies"

export type BackgroundType =
  | "Error"
  | "Home"
  | "About"
  | "Characters"
  | "Character"
  | `Character-${Vision}`
  | "Enemies"
  | `Enemies-${EnemiesType}`
  | "Bosses"
  | "Weapons"
  | "Artifacts"
