import Utils from "@/utils/utils"
import Services from "@/services/services"
import { ItemHandler } from "@/models/services"
import { Weapon } from "@/models/weapons"
import { BASE_URL, FANDOM_URL } from "@/consts/urls"
import { ENDPOINTS } from "@/consts/services"

export const weaponHandler: ItemHandler<Weapon> = item => {
  item.urls = {
    icon: `${BASE_URL}/${ENDPOINTS.WEAPONS.MAIN}/${Utils.strFormatter(item.id)}/icon`,
    fandom: `${FANDOM_URL}/${item.name}`,
  }
}

const WeaponAPI = new Services(ENDPOINTS.WEAPONS.MAIN, weaponHandler)

export default WeaponAPI
