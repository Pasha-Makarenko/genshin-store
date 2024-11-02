import Services from "@/services/services"
import { ItemHandler } from "@/models/services"
import { Artifact } from "@/models/artifacts"
import { BASE_URL, FANDOM_URL } from "@/consts/urls"
import { ENDPOINTS } from "@/consts/services"
import { ARTIFACTS_SET } from "@/consts/artifacts"

export const artifactHandler: ItemHandler<Artifact> = item => {
  item.urls = {
    "circlet-of-logos": "",
    "flower-of-life": "",
    "goblet-of-eonothem": "",
    "plume-of-death": "",
    "sands-of-eon": "",
    fandom: `${FANDOM_URL}/${item.name}`,
  }

  for (const key in ARTIFACTS_SET) {
    item.urls[key as keyof Artifact["urls"]] =
      `${BASE_URL}/${ENDPOINTS.ARTIFACTS.MAIN}/${item.id}/${key}`
  }
}

const ArtifactAPI = new Services(ENDPOINTS.ARTIFACTS.MAIN, artifactHandler)

export default ArtifactAPI
