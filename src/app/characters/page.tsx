"use client"

import Image from "next/image"
import Link from "next/link"
import { PageSearchParams } from "@/models/global"
import { Character } from "@/models/characters"
import Items from "@/components/Items"
import { CHARACTERS_PATH_BY_ID } from "@/consts/pathnames"
import { useCharacters } from "@/store/characters"

export default function Characters({
  searchParams,
}: {
  searchParams: PageSearchParams
}) {
  const itemCreator = (item: Character) => (
    <Link
      href={CHARACTERS_PATH_BY_ID(item.id)}
      className="list__item item-list"
    >
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
        <div className="item-list__rarity rarity">
          {new Array(item.rarity).fill(null).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
    </Link>
  )

  return (
    <Items<Character>
      useStore={useCharacters}
      searchParams={searchParams}
      baseURLByID={CHARACTERS_PATH_BY_ID}
      itemCreator={itemCreator}
      preloadCount={1}
    />
  )
}
