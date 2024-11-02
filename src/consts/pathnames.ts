export const HOME_PATH = "/"
export const ABOUT_PATH = "/about"
export const CHARACTERS_PATH = "/characters"
export const ENEMIES_PATH = "/enemies"
export const BOSSES_PATH = "/bosses"
export const WEAPONS_PATH = "/weapons"
export const ARTIFACTS_PATH = "/artifacts"
export const CHARACTERS_PATH_BY_ID: (id: string) => string = id =>
  `${CHARACTERS_PATH}/${id}`
export const ENEMIES_PATH_BY_ID: (id: string) => string = id =>
  `${ENEMIES_PATH}/${id}`
export const BOSSES_PATH_BY_ID: (id: string) => string = id =>
  `${BOSSES_PATH}/${id}`
export const WEAPONS_PATH_BY_ID: (id: string) => string = id =>
  `${WEAPONS_PATH}/${id}`
export const ARTIFACTS_PATH_BY_ID: (id: string) => string = id =>
  `${ARTIFACTS_PATH}/${id}`
