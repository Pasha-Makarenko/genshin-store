export type Rarity = 1 | 2 | 3 | 4 | 5
export type Nation =
  | "Fontaine"
  | "Inazuma"
  | "Liyue"
  | "Mondstadt"
  | "Sumeru"
  | "Natlan"
export type Region = Nation | "Global" | "Multiple" | "Dragonspine"
export type Vision =
  | "Geo"
  | "Dendro"
  | "Cryo"
  | "Pyro"
  | "Hydro"
  | "Electro"
  | "Anemo"
export type VisionType =
  | "GEO"
  | "DENDRO"
  | "CRYO"
  | "PYRO"
  | "HYDRO"
  | "ELECTRO"
  | "ANEMO"

export interface PageSearchParams {
  page?: string
  showMoreCount?: string
  search?: string
}

export interface PageItemProps {
  params: {
    id: string
  }
}

export interface PageItemPropsPromise {
  params: Promise<{
    id: string
  }>
}
