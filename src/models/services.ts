export interface Item {
  id: unknown
  search?: string
}

export type ItemHandler<T extends Item> = (item: T) => void

export interface IResponse<T> {
  data: T | null
  error: Error | null
}

export type GetAllID<T extends Item> = (
  search?: string
) => Promise<IResponse<Array<T["id"]>>>

export type GetItemByID<T extends Item> = (id: T["id"]) => Promise<IResponse<T>>

export type GetItems<T extends Item> = (
  page: number,
  countPerPage: number,
  search?: string
) => Promise<IResponse<Array<T>>>
