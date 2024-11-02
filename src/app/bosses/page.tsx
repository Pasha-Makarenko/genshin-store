"use client"

import Image from "next/image"
import Link from "next/link"
import { PageSearchParams } from "@/models/global"
import { Boss } from "@/models/bosses"
import Items from "@/components/Items"
import { BOSSES_PATH_BY_ID } from "@/consts/pathnames"
import { useBosses } from "@/store/bosses"

export default function Bosses({
  searchParams,
}: {
  searchParams: PageSearchParams
}) {
  const itemCreator = (item: Boss) => (
    <Link href={BOSSES_PATH_BY_ID(item.id)} className="list__item item-list">
      <Image
        loader={() => item.urls.icon}
        src={item.urls.icon}
        alt={item.id}
        width={256}
        height={256}
        className="item-list__image"
        loading="lazy"
      />
      <div className="item-list__content">
        <h1 className="item-list__name">{item.name}</h1>
      </div>
    </Link>
  )

  return (
    <Items<Boss>
      useStore={useBosses}
      searchParams={searchParams}
      baseURLByID={BOSSES_PATH_BY_ID}
      itemCreator={itemCreator}
      preloadCount={1}
    />
  )
}
