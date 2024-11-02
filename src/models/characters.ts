import { Nation, Rarity, Vision, VisionType } from "@/models/global"
import { WeaponType, WeaponTypeCapitalize } from "@/models/weapons"

export type Gender = "Male" | "Female" | "Male/Female"
export type SkillTalentType =
  | "NORMAL_ATTACK"
  | "ELEMENTAL_SKILL"
  | "ELEMENTAL_BURST"
  | "MISC"

export interface Character {
  id: string
  name: string
  title: string
  vision: Vision
  weapon: WeaponType
  gender: Gender
  nation: Nation
  affiliation: string
  rarity: Rarity
  release: string
  constellation: string
  birthday: string
  description: string
  vision_key: VisionType
  weapon_type: WeaponTypeCapitalize
  constellations: Array<{
    level: number
    name: string
    description: string
  }>
  skillTalents: Array<{
    name: string
    unlock: string
    description: string
    type: SkillTalentType
  }>
  passiveTalents: Array<{
    name: string
    unlock: string
    description: string
  }>
  ascension_materials: {
    [key: `level_${number}`]: Array<{
      name: string
      value: number
    }>
  }
  urls: {
    icon: string
    card: string
    constellation: string
    constellations: Array<string>
    skillTalents: {
      NORMAL_ATTACK: string
      ELEMENTAL_SKILL: string
      ELEMENTAL_BURST: string
      MISC?: string
    }
    passiveTalents: Array<string>
    fandom: string
  }
}
