import { BASE_URL } from "@/consts/urls"
import { Vision } from "@/models/global"
import Utils from "@/utils/utils"
import { NATION } from "@/consts/global"

export const ENDPOINTS = {
  CHARACTERS: {
    MAIN: "characters",
    SKILL_TALENTS: {
      NORMAL_ATTACK: "talent-na",
      ELEMENTAL_SKILL: "talent-skill",
      ELEMENTAL_BURST: "talent-burst",
      MISC: "talent-passive-misc",
    },
    PASSIVE_TALENTS: (id: number | string) => `talent-passive-${id}`,
  },
  ENEMIES: {
    MAIN: "enemies",
  },
  BOSSES: {
    MAIN: "boss/weekly-boss",
  },
  WEAPONS: {
    MAIN: "weapons",
  },
  ARTIFACTS: {
    MAIN: "artifacts",
  },
  NATION: {
    MAIN: "nations",
    ICON: (nation: string) =>
      Utils.arrayOfStrIncludes(NATION, nation)
        ? `${BASE_URL}/${ENDPOINTS.NATION.MAIN}/${Utils.strFormatter(nation)}/icon`
        : "",
  },
  VISION: {
    MAIN: "elements",
    ICON: (vision: Vision) =>
      `${BASE_URL}/${ENDPOINTS.VISION.MAIN}/${Utils.strFormatter(vision)}/icon`,
  },
  CONSTELLATIONS: (id: number) => `constellation-${id}`,
}
