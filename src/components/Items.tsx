"use client"

import { ReactNode, Fragment, useEffect, useState } from "react"
import { useShallow } from "zustand/react/shallow"
import { StoreApi, UseBoundStore } from "zustand"
import { Item } from "@/models/services"
import { UseStore } from "@/models/store"
import { PageSearchParams } from "@/models/global"
import Loader from "@/components/Loader"
import Search, { SearchProps } from "@/components/Search"
import Pagination, { PaginationProps } from "@/components/Pagination"
import { PAGINATION } from "@/consts/pagination"
import { useSearchParamEffect } from "@/hooks/pathname"
import Error from "@/components/Error"

export interface ItemProps<T extends Item> {
  useStore: UseBoundStore<StoreApi<UseStore<T>>>
  searchParams: PageSearchParams
  baseURLByID: (id: T["id"]) => string
  itemCreator: (item: T) => ReactNode
  preloadCount?: number
}

function Items<T extends Item>(props: ItemProps<T>) {
  const items = props.useStore(useShallow(state => state))
  const [search, setSearch] = useState<SearchProps["search"]>(
    props.searchParams?.search || ""
  )
  const [pagination, setPagination] = useState<PaginationProps["pagination"]>({
    page: props.searchParams?.page
      ? parseInt(props.searchParams?.page) - 1
      : PAGINATION.START_PAGE,
    showMoreCount: props.searchParams?.showMoreCount
      ? parseInt(props.searchParams?.showMoreCount)
      : 0,
  })
  const paginateHandler = useSearchParamEffect([
    {
      type: "page",
      value: pagination.page + 1,
      condition: () => items.allID.length > PAGINATION.COUNT_PER_PAGE,
    },
    {
      type: "showMoreCount",
      value: pagination.showMoreCount.toString(),
      condition: () => items.allID.length > PAGINATION.COUNT_PER_PAGE,
    },
    {
      type: "search",
      value: search,
      condition: () => search !== "",
    },
  ])

  useEffect(() => {
    items
      .getAllItemsID(props.searchParams?.search || "")
      .then(_ => paginateHandler())
  }, [])

  useEffect(() => {
    console.log(items.data)
  }, [items])

  useEffect(() => {
    paginateHandler()
  }, [search])

  useEffect(() => {
    const pageChangeHandler = async () => {
      await items.getItems(
        pagination.page + pagination.showMoreCount,
        PAGINATION.COUNT_PER_PAGE,
        !!pagination.showMoreCount,
        search
      )

      if (props.preloadCount) {
        for (let i = 0; i < props.preloadCount; i++) {
          if (
            i <=
            Math.ceil(items.allID.length / PAGINATION.COUNT_PER_PAGE) - 1
          ) {
            await items.getItems(
              pagination.page + pagination.showMoreCount + i + 1,
              PAGINATION.COUNT_PER_PAGE,
              false,
              search
            )
          }
        }
      }
    }

    pageChangeHandler().then(_ => paginateHandler())
  }, [pagination])

  const searchHandler = async () => {
    items.clearItems()
    await items.getAllItemsID(search)
    setPagination({
      page: PAGINATION.START_PAGE,
      showMoreCount: 0,
    })
  }

  if (items.error.getAllID || items.error.getMore || items.error.getMore) {
    return <Error>Unable to fetch items</Error>
  }

  if (items.loading.getAllID || items.loading.getMany) {
    return <Loader />
  }

  return (
    <section className="items">
      <Search
        search={search}
        setSearch={setSearch}
        onSubmit={searchHandler}
        items={items.allID}
        baseURLByID={props.baseURLByID}
      />
      <div className="items__list list">
        {Object.entries(items.data)
          .filter(
            ([key]) =>
              !isNaN(parseInt(key)) &&
              parseInt(key) >= pagination.page &&
              parseInt(key) <= pagination.page + pagination.showMoreCount
          )
          .map(([, data]) => data.content)
          .flat()
          .map((item, i) => (
            <Fragment key={i}>{props.itemCreator(item)}</Fragment>
          ))}
      </div>
      {items.loading.getMore ? <Loader /> : null}
      <Pagination
        items={items.allID.length}
        pagination={pagination}
        setPagination={setPagination}
        pageSize={PAGINATION.COUNT_PER_PAGE}
        renderButtonCountSides={2}
        renderButtonCountActive={1}
      />
    </section>
  )
}

export default Items
