"use client"

import Link from "next/link"
import { PageSearchParams } from "@/models/global"
import { Artifact } from "@/models/artifacts"
import Items from "@/components/Items"
import { ARTIFACTS_PATH_BY_ID } from "@/consts/pathnames"
import { useArtifacts } from "@/store/artifacts"

export default function Artifacts({
  searchParams,
}: {
  searchParams: PageSearchParams
}) {
  const itemCreator = (item: Artifact) => (
    <Link href={ARTIFACTS_PATH_BY_ID(item.id)} className="list__item item-list">
      <div className="item-list__content">
        <h1 className="item-list__name">{item.name}</h1>
        <div className="item-list__rarity rarity">
          {new Array(item.max_rarity).fill(null).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
    </Link>
  )

  return (
    <Items<Artifact>
      useStore={useArtifacts}
      searchParams={searchParams}
      baseURLByID={ARTIFACTS_PATH_BY_ID}
      itemCreator={itemCreator}
    />
  )
}
