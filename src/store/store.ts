import Services from "@/services/services"
import { Item } from "@/models/services"
import { SetState, UseStore } from "@/models/store"
import Utils from "@/utils/utils"

class Store<T extends Item> {
  constructor(
    public API: Services<T>,
    public setState: SetState<T>,
    public getState: () => UseStore<T>,
    public revalidateTime: number = 3600000
  ) {}

  public initialState: Omit<
    UseStore<T>,
    "getItemByID" | "getItems" | "getAllItemsID" | "clearItems"
  > = {
    data: {
      other: {
        content: [],
        load: -Infinity,
      },
    },
    allID: [],
    loading: {
      getOne: false,
      getMany: false,
      getMore: false,
      getAllID: false,
    },
    error: {
      getOne: null,
      getMany: null,
      getMore: null,
      getAllID: null,
    },
    revalidateTime: this.revalidateTime,
  }

  public getItemByID = async (id: string) => {
    this.setState({
      loading: {
        ...this.getState().loading,
        getOne: true,
      },
    })

    let item

    let index = -1

    for (const key in this.getState().data) {
      if (!isNaN(parseInt(key))) {
        index = this.getState().data[key].content.findIndex(el => el.id === id)
      }

      if (index !== -1) {
        break
      }
    }

    if (index === -1) {
      item = await this.API.getItemByID(id)
    }

    this.setState({
      data:
        index !== -1 || (item && item.error)
          ? {
              ...this.getState().data,
              other: {
                content: Utils.arrRemoveItems(
                  this.getState().data.other.content,
                  el => el.id === id
                ),
                load: Date.now(),
              },
            }
          : {
              ...this.getState().data,
              other: {
                content: this.getState().data.other.content.concat([
                  item!.data!,
                ]),
                load: Date.now(),
              },
            },
      error: {
        ...this.getState().error,
        getOne: item?.error || null,
      },
      loading: {
        ...this.getState().loading,
        getOne: false,
      },
    })
  }

  public getItems = async (
    page: number,
    pagePerCount: number,
    showMore: boolean,
    search?: string
  ) => {
    this.setState({
      loading: {
        ...this.getState().loading,
        getMany: !showMore,
        getMore: showMore,
      },
    })

    console.log(page)

    let items

    if (
      !this.getState().data.hasOwnProperty(page) ||
      this.getState().data[page].content.length === 0 ||
      this.getState().data[page].load + this.getState().revalidateTime <=
        Date.now()
    ) {
      items = await this.API.getItems(page, pagePerCount, search)

      this.setState({
        data: items.error
          ? this.getState().data
          : {
              ...this.getState().data,
              [page]: {
                content: items.data!,
                load: Date.now(),
              },
            },
        error: {
          ...this.getState().error,
          getMany: items.error,
          getMore: showMore ? items.error : null,
        },
        loading: {
          ...this.getState().loading,
          getMany: false,
          getMore: false,
        },
      })
    } else {
      this.setState({
        error: {
          ...this.getState().error,
          getMany: null,
          getMore: null,
        },
        loading: {
          ...this.getState().loading,
          getMany: false,
          getMore: false,
        },
      })
    }
  }

  public getAllItemsID = async (search?: string) => {
    this.setState({
      loading: {
        ...this.getState().loading,
        getAllID: true,
      },
    })

    const list = await this.API.getAllID(search)

    this.setState({
      allID: list.error ? [] : list.data!,
      error: {
        ...this.getState().error,
        getAllID: list.error,
      },
      loading: {
        ...this.getState().loading,
        getAllID: false,
      },
    })
  }

  public clearItems = () => {
    this.setState({
      data: {
        other: {
          content: [],
          load: -Infinity,
        },
      },
    })
  }
}

export default Store
