import { IResponse, Item } from "@/models/services"

export interface UseStore<T extends Item> {
  data: {
    [page: number]: {
      content: Array<T>
      load: number
    }
    other: {
      content: Array<T>
      load: number
    }
  }
  allID: Array<T["id"]>
  loading: {
    getOne: boolean
    getMany: boolean
    getMore: boolean
    getAllID: boolean
  }
  error: {
    getOne: IResponse<T>["error"]
    getMany: IResponse<Array<T>>["error"]
    getMore: IResponse<Array<T>>["error"]
    getAllID: IResponse<Array<T["id"]>>["error"]
  }
  revalidateTime: number
  getItemByID: (id: T["id"]) => Promise<void>
  getItems: (
    page: number,
    pagePerCount: number,
    showMore: boolean,
    search?: string
  ) => Promise<void>
  getAllItemsID: (search?: string) => Promise<void>
  clearItems: () => void
}

export type SetState<T extends Item> = {
  _(
    partial:
      | UseStore<T>
      | Partial<UseStore<T>>
      | ((state: UseStore<T>) => UseStore<T> | Partial<UseStore<T>>),
    replace?: boolean | undefined
  ): void
  actionName?: string
}["_"]
