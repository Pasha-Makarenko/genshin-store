import { Gender } from "@/models/characters"

export interface ICHARACTERS_CONSTS {
  GENDER: Array<Gender>
}

export const CHARACTERS_CONSTS: ICHARACTERS_CONSTS = {
  GENDER: ["Male", "Female", "Male/Female"],
}
