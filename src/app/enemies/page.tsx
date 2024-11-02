"use client"

import Link from "next/link"
import { PageSearchParams } from "@/models/global"
import { Enemy } from "@/models/enemies"
import Items from "@/components/Items"
import { ENEMIES_PATH_BY_ID } from "@/consts/pathnames"
import { useEnemies } from "@/store/enemies"

export default function Weapons({
  searchParams,
}: {
  searchParams: PageSearchParams
}) {
  const itemCreator = (item: Enemy) => (
    <Link href={ENEMIES_PATH_BY_ID(item.id)} className="list__item item-list">
      <div className="item-list__content">
        <h1 className="item-list__name">{item.name}</h1>
        <h1 className="item-list__type">{item.type}</h1>
      </div>
    </Link>
  )

  return (
    <Items<Enemy>
      useStore={useEnemies}
      searchParams={searchParams}
      baseURLByID={ENEMIES_PATH_BY_ID}
      itemCreator={itemCreator}
      preloadCount={1}
    />
  )
}
