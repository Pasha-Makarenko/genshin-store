"use client"

import Link from "next/link"
import Image from "next/image"
import Loader from "@/components/Loader"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import { useBosses } from "@/store/bosses"
import { useBackground } from "@/store/background"
import { PageItemProps } from "@/models/global"
import { ARTIFACTS_PATH_BY_ID } from "@/consts/pathnames"
import Utils from "@/utils/utils"
import Error from "@/components/Error"

export default function Page({ params: { id } }: PageItemProps) {
  const setType = useBackground(useShallow(state => state.setType))
  const boss = useBosses(
    useShallow(state => ({
      ...state,
      data: Object.entries(state.data)
        .map(([, data]) => data.content)
        .flat()
        .find(item => item.id === id),
    }))
  )

  useEffect(() => {
    setType("Bosses")
    boss.getItemByID(id).then(_ => _)
  }, [])

  useEffect(() => {
    if (boss.error.getOne) {
      setType("Error")
    }
  }, [boss])

  if (boss.error.getOne) {
    return <Error>Unable to fetch boss</Error>
  }

  if (boss.loading.getOne || !boss.data) {
    return <Loader />
  }

  return (
    <section className="boss">
      <div className="boss__info">
        <Image
          loader={() => boss.data!.urls.portrait}
          src={boss.data.urls.portrait}
          alt={boss.data.name}
          width={1000}
          height={1000}
          className="boss__card"
          layout="responsive"
          loading="lazy"
        />
        <div className="boss__content">
          <h1 className="boss__name">{boss.data.name}</h1>
          <h3 className="boss__subtitle">Drops</h3>
          <table className="boss__table table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Rarity</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {boss.data.drops.map((drop, i) => (
                <tr key={i}>
                  <td>
                    <Image
                      loader={() => boss.data!.urls.drops[drop.name]}
                      src={boss.data!.urls.drops[drop.name]}
                      alt={drop.name}
                      loading="lazy"
                      width={60}
                      height={60}
                    />
                  </td>
                  <td>{drop.name}</td>
                  <td>
                    <div className="rarity">
                      {new Array(drop.rarity).fill(null).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </td>
                  <td>{drop.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h3 className="boss__subtitle">Artifacts</h3>
      <table className="boss__table table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Max rarity</th>
          </tr>
        </thead>
        <tbody>
          {boss.data.artifacts.map((artifact, i) => (
            <tr key={i}>
              <td>
                <Link
                  href={ARTIFACTS_PATH_BY_ID(Utils.strToID(artifact.name))}
                  className="link"
                >
                  {artifact.name}
                </Link>
              </td>
              <td>
                <div className="rarity">
                  {new Array(artifact.max_rarity).fill(null).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={boss.data.urls.fandom} className="boss__fandom link">
        More information about {boss.data.name}
      </Link>
    </section>
  )
}
