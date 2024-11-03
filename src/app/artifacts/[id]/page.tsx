"use client"

import Link from "next/link"
import Image from "next/image"
import Loader from "@/components/Loader"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import { useArtifacts } from "@/store/artifacts"
import { useBackground } from "@/store/background"
import { PageItemProps } from "@/models/global"
import { ARTIFACTS_SET } from "@/consts/artifacts"
import Error from "@/components/Error"
import { Artifact } from "@/models/artifacts"

export default function Page({ params: { id } }: PageItemProps) {
  const setType = useBackground(useShallow(state => state.setType))
  const artifact = useArtifacts(
    useShallow(state => ({
      ...state,
      data: Object.entries(state.data)
        .map(([, data]) => data.content)
        .flat()
        .find(item => item.id === id),
    }))
  )

  useEffect(() => {
    setType("Artifacts")
    artifact.getItemByID(id).then(_ => _)
  }, [])

  useEffect(() => {
    if (artifact.error.getOne) {
      setType("Error")
    }
  }, [])

  if (artifact.error.getOne) {
    return <Error>Unable to fetch boss</Error>
  }

  if (artifact.loading.getOne || !artifact.data) {
    return <Loader />
  }

  return (
    <section className="artifact item">
      <h1 className="item__name">{artifact.data.name}</h1>
      <h3 className="item__subtitle">Set</h3>
      <table className="item__table table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Set</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ARTIFACTS_SET).map(([key, value], i) => (
            <tr key={i}>
              <td>
                <Image
                  loader={() =>
                    artifact.data!.urls[key as keyof Artifact["urls"]]
                  }
                  src={artifact.data!.urls[key as keyof Artifact["urls"]]}
                  alt={value}
                  loading="lazy"
                  onError={e => {
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                  width={60}
                  height={60}
                />
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="item__subtitle">Information</h3>
      <table className="item__table table">
        <tbody>
          <tr>
            <td>Max rarity</td>
            <td>
              <div className="rarity">
                {new Array(artifact.data.max_rarity).fill(null).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <td>2 piece bonus</td>
            <td>{artifact.data["2-piece_bonus"]}</td>
          </tr>
          <tr>
            <td>4 piece bonus</td>
            <td>{artifact.data["4-piece_bonus"]}</td>
          </tr>
        </tbody>
      </table>
      <Link href={artifact.data.urls.fandom} className="item__fandom link">
        More information about {artifact.data.name}
      </Link>
    </section>
  )
}
