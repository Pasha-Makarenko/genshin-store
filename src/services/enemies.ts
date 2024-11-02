import Utils from "@/utils/utils"
import Services from "@/services/services"
import { ItemHandler } from "@/models/services"
import { Enemy } from "@/models/enemies"
import { BASE_URL, FANDOM_URL } from "@/consts/urls"
import { ENDPOINTS } from "@/consts/services"

export const enemyHandler: ItemHandler<Enemy> = item => {
  item.urls = {
    portrait: `${BASE_URL}/${ENDPOINTS.ENEMIES.MAIN}/${Utils.strFormatter(item.id)}/portrait`,
    fandom: `${FANDOM_URL}/${item.name}`,
  }

  if (item.element) {
    item.elements = item.element
  }

  if (item["elemental-description"]) {
    item["elemental-descriptions"] = item["elemental-description"]
  }
}

const EnemyAPI = new Services(ENDPOINTS.ENEMIES.MAIN, enemyHandler)

export default EnemyAPI
