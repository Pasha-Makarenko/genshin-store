import { BASE_URL } from "@/consts/urls"
import Utils from "@/utils/utils"
import {
  GetAllID,
  GetItemByID,
  GetItems,
  Item,
  ItemHandler,
} from "@/models/services"

class Services<T extends Item> {
  constructor(
    public endpoint: string,
    public handler?: ItemHandler<T>
  ) {}

  public getAllID: GetAllID<T> = async (search?) => {
    try {
      const response = await fetch(`${BASE_URL}/${this.endpoint}`)

      if (!response.ok) {
        throw new Error("Unable to fetch posts.")
      }

      const list: Array<T["id"]> = await response.json()

      return {
        data: search
          ? list.filter((id) => Utils.strIncludes(id, search))
          : list,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }

  public getItemByID: GetItemByID<T> = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${this.endpoint}/${id}`)

      if (!response.ok) {
        throw new Error("Unable to fetch posts.")
      }

      const item: T = await response.json()

      if (this.handler) {
        this.handler(item)
      }

      return {
        data: item,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }

  public getItems: GetItems<T> = async (page, countPerPage, search?) => {
    try {
      const list = await this.getAllID(search)
      const items: Array<T> = []

      if ((list.error && page < 0) || page * countPerPage > list.data!.length) {
        throw new Error("Unable to fetch posts.")
      }

      for (let i = page * countPerPage; i < list.data!.length; i++) {
        if (items.length >= countPerPage) {
          break
        }

        const item = await this.getItemByID(list.data![i])

        if (item.error) {
          throw new Error("Unable to fetch posts.")
        }

        items.push(item.data!)
      }

      return {
        data: items,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error as Error,
      }
    }
  }
}

export default Services
