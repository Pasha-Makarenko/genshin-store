import Utils from "@/utils/utils"
import Services from "@/services/services"
import { ItemHandler } from "@/models/services"
import { Boss } from "@/models/bosses"
import { BASE_URL, FANDOM_URL } from "@/consts/urls"
import { ENDPOINTS } from "@/consts/services"

export const bossHandler: ItemHandler<Boss> = item => {
  item.urls = {
    icon: `${BASE_URL}/${ENDPOINTS.BOSSES.MAIN}/${Utils.strFormatter(item.id)}/icon`,
    portrait: `${BASE_URL}/${ENDPOINTS.BOSSES.MAIN}/${Utils.strFormatter(item.id)}/portrait`,
    drops: Object.fromEntries(
      item.drops.map(drop => [
        drop.name,
        `${BASE_URL}/${ENDPOINTS.BOSSES.MAIN}/${Utils.strFormatter(item.id)}/${Utils.strToID(drop.name)}`,
      ])
    ),
    fandom: `${FANDOM_URL}/${item.name}`,
  }

  if (item.id === "stormterror") {
    item.urls.drops[item.drops[item.drops.length - 1].name] =
      `${BASE_URL}/${ENDPOINTS.BOSSES.MAIN}/${Utils.strFormatter(item.id)}/dvalin-s-sigh`
  }
}

const BossAPI = new Services(ENDPOINTS.BOSSES.MAIN, bossHandler)

export default BossAPI
