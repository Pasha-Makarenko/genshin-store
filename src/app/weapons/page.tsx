"use client"

import Image from "next/image"
import Link from "next/link"
import { PageSearchParams } from "@/models/global"
import { Weapon } from "@/models/weapons"
import Items from "@/components/Items"
import { WEAPONS_PATH_BY_ID } from "@/consts/pathnames"
import { useWeapons } from "@/store/weapons"

export default function Weapons({
  searchParams,
}: {
  searchParams: PageSearchParams
}) {
  const itemCreator = (item: Weapon) => (
    <Link href={WEAPONS_PATH_BY_ID(item.id)} className="list__item item-list">
      <Image
        loader={() => item.urls.icon}
        src={item.urls.icon}
        alt={item.id}
        width={256}
        height={256}
        onError={e => {
          ;(e.target as HTMLImageElement).style.display = "none"
        }}
        className="item-list__image"
        loading="lazy"
      />
      <div className="item-list__content">
        <h1 className="item-list__name">{item.name}</h1>
        <div className="item-list__rarity rarity">
          {new Array(item.rarity).fill(null).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
    </Link>
  )

  return (
    <Items<Weapon>
      useStore={useWeapons}
      searchParams={searchParams}
      baseURLByID={WEAPONS_PATH_BY_ID}
      itemCreator={itemCreator}
    />
  )
}
