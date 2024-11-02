"use client"

import Link from "next/link"
import Image from "next/image"
import Loader from "@/components/Loader"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import { useWeapons } from "@/store/weapons"
import { useBackground } from "@/store/background"
import { PageItemProps } from "@/models/global"
import Error from "@/components/Error"

export default function Page({ params: { id } }: PageItemProps) {
  const setType = useBackground(useShallow(state => state.setType))
  const weapon = useWeapons(
    useShallow(state => ({
      ...state,
      data: Object.entries(state.data)
        .map(([, data]) => data.content)
        .flat()
        .find(item => item.id === id),
    }))
  )

  useEffect(() => {
    setType("Weapons")
    weapon.getItemByID(id).then(_ => _)
  }, [])

  useEffect(() => {
    if (weapon.error.getOne) {
      setType("Error")
    }
  }, [weapon])

  if (weapon.error.getOne) {
    return <Error>Unable to fetch weapon</Error>
  }

  if (weapon.loading.getOne || !weapon.data) {
    return <Loader />
  }

  return (
    <section className="weapon">
      <div className="weapon__info">
        <Image
          loader={() => weapon.data!.urls.icon}
          src={weapon.data.urls.icon}
          alt={weapon.data.name}
          width={1000}
          height={1000}
          className="weapon__card"
          layout="responsive"
          loading="lazy"
        />
        <div className="weapon__content">
          <h1 className="weapon__name">{weapon.data.name}</h1>
          <table className="weapon__table table">
            <tbody>
              <tr>
                <td>Rarity</td>
                <td>
                  <div className="rarity">
                    {new Array(weapon.data.rarity).fill(null).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{weapon.data.type}</td>
              </tr>
              <tr>
                <td>Base attack</td>
                <td>{weapon.data.baseAttack}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{weapon.data.location}</td>
              </tr>
              <tr>
                <td>Sub stat</td>
                <td>{weapon.data.subStat}</td>
              </tr>
              <tr>
                <td>Ascension material</td>
                <td>{weapon.data.ascensionMaterial}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h1 className="weapon__title">{weapon.data.passiveName}</h1>
      <h1 className="weapon__description">{weapon.data.passiveDesc}</h1>
      <Link href={weapon.data.urls.fandom} className="weapon__fandom link">
        More information about {weapon.data.name}
      </Link>
    </section>
  )
}
