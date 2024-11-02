import Services from "@/services/services"
import Utils from "@/utils/utils"
import { ItemHandler } from "@/models/services"
import { Character } from "@/models/characters"
import { ENDPOINTS } from "@/consts/services"
import { BASE_URL, FANDOM_URL } from "@/consts/urls"
import { CHARACTERS_CONSTS } from "@/consts/characters"

const characterHandler: ItemHandler<Character> = item => {
  item.urls = {
    icon: `${BASE_URL}/${ENDPOINTS.CHARACTERS.MAIN}/${Utils.strFormatter(item.id)}/icon-big`,
    card: `${BASE_URL}/${ENDPOINTS.CHARACTERS.MAIN}/${Utils.strFormatter(item.id)}/card`,
    constellation: `${BASE_URL}/${ENDPOINTS.CHARACTERS.MAIN}/${Utils.strFormatter(item.id)}/constellation`,
    fandom: `${FANDOM_URL}/${item.name}`,
    constellations: item.constellations.map(
      (_, i) =>
        `${BASE_URL}/${ENDPOINTS.CHARACTERS.MAIN}/${Utils.strFormatter(item.id)}/${ENDPOINTS.CONSTELLATIONS(i + 1)}`
    ),
    skillTalents: {
      NORMAL_ATTACK: `${BASE_URL}/${ENDPOINTS.CHARACTERS.MAIN}/${Utils.strFormatter(item.id)}/${ENDPOINTS.CHARACTERS.SKILL_TALENTS.NORMAL_ATTACK}`,
      ELEMENTAL_SKILL: `${BASE_URL}/${ENDPOINTS.CHARACTERS.MAIN}/${Utils.strFormatter(item.id)}/${ENDPOINTS.CHARACTERS.SKILL_TALENTS.ELEMENTAL_SKILL}`,
      ELEMENTAL_BURST: `${BASE_URL}/${ENDPOINTS.CHARACTERS.MAIN}/${Utils.strFormatter(item.id)}/${ENDPOINTS.CHARACTERS.SKILL_TALENTS.ELEMENTAL_BURST}`,
    },
    passiveTalents: item.passiveTalents.map(
      (_, i, array) =>
        `${BASE_URL}/${ENDPOINTS.CHARACTERS.MAIN}/${Utils.strFormatter(item.id)}/${ENDPOINTS.CHARACTERS.PASSIVE_TALENTS(
          item.id === "kokomi" && i === array.length - 1
            ? "misc"
            : Utils.strIncludes(item.id, "traveler")
              ? i + 1
              : i
        )}`
    ),
  }

  if (Utils.strIncludes(item.id, "traveler")) {
    item.gender = CHARACTERS_CONSTS.GENDER[2]
  }

  if (item.id === "ayaka" || item.id === "Mona") {
    item.skillTalents[item.skillTalents.length - 1].type = "MISC"
    item.urls.skillTalents.MISC = `${BASE_URL}/${ENDPOINTS.CHARACTERS.MAIN}/${Utils.strFormatter(item.id)}/${ENDPOINTS.CHARACTERS.SKILL_TALENTS.MISC}`
  }
}

const CharacterAPI = new Services<Character>(
  ENDPOINTS.CHARACTERS.MAIN,
  characterHandler
)

export default CharacterAPI
