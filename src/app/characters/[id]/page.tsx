"use client"

import Link from "next/link"
import Image from "next/image"
import Loader from "@/components/Loader"
import { useEffect, Fragment } from "react"
import { useShallow } from "zustand/react/shallow"
import { useCharacters } from "@/store/characters"
import { useBackground } from "@/store/background"
import { PageItemProps } from "@/models/global"
import { ENDPOINTS } from "@/consts/services"
import Error from "@/components/Error"

export default function Character({ params: { id } }: PageItemProps) {
  const setType = useBackground(useShallow(state => state.setType))
  const character = useCharacters(
    useShallow(state => ({
      ...state,
      data: Object.entries(state.data)
        .map(([, data]) => data.content)
        .flat()
        .find(item => item.id === id),
    }))
  )

  useEffect(() => {
    character.getItemByID(id).then(_ => _)
  }, [])

  useEffect(() => {
    if (character.data) {
      setType(`Character-${character.data.vision}`)
    } else if (character.error.getOne) {
      setType("Error")
    }
  }, [character])

  if (character.error.getOne) {
    return <Error>Unable to fetch character</Error>
  }

  if (character.loading.getOne || !character.data) {
    return <Loader />
  }

  return (
    <section className="character">
      <div className="character__info">
        <Image
          loader={() => character.data!.urls.card}
          src={character.data.urls.card}
          alt={character.data.name}
          width={1000}
          height={2000}
          className="character__card"
          layout="responsive"
          loading="lazy"
        />
        <div className="character__content">
          <h1 className="character__name">{character.data.name}</h1>
          <h3 className="character__title">{character.data.title}</h3>
          <p className="character__description">{character.data.description}</p>
          <table className="character__table table">
            <tbody>
              <tr>
                <td>Rarity</td>
                <td>
                  <div className="rarity">
                    {new Array(character.data.rarity).fill(null).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <td>Weapon</td>
                <td>{character.data.weapon}</td>
              </tr>
              <tr>
                <td>Element</td>
                <td>
                  <div className="table__flex">
                    <Image
                      loader={() =>
                        ENDPOINTS.VISION.ICON(character.data!.vision)
                      }
                      src={ENDPOINTS.VISION.ICON(character.data.vision)}
                      alt={character.data.vision}
                      loading="lazy"
                      width={30}
                      height={30}
                    />
                    <div>{character.data.vision}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{character.data.gender}</td>
              </tr>
              <tr>
                <td>Birthday</td>
                <td>
                  {new Date(character.data.birthday).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </td>
              </tr>
              <tr>
                <td>Constellation</td>
                <td>
                  <div className="table__flex">
                    <Image
                      loader={() => character.data!.urls.constellation}
                      src={character.data.urls.constellation}
                      alt={character.data.constellation}
                      loading="lazy"
                      width={30}
                      height={30}
                    />
                    <div>{character.data.constellation}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Nation</td>
                <td>
                  <div className="table__flex">
                    {ENDPOINTS.NATION.ICON(character.data.nation) !==
                    "" ? null : (
                      <Image
                        loader={() =>
                          ENDPOINTS.NATION.ICON(character.data!.nation)
                        }
                        src={ENDPOINTS.NATION.ICON(character.data.nation)}
                        alt={character.data.nation}
                        loading="lazy"
                        width={30}
                        height={30}
                      />
                    )}
                    <div>{character.data.nation}</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Affiliation</td>
                <td>{character.data.affiliation}</td>
              </tr>
              <tr>
                <td>Release date</td>
                <td>
                  {new Date(character.data.release).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h1 className="character__table-title">Ascension</h1>
      <table className="character__skill table">
        <thead>
          <tr>
            <th>Level</th>
            <th>Materials</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(character.data.ascension_materials).map(
            ([level, materials], i) => (
              <tr key={i}>
                <td>{level.split("_")[1]}</td>
                <td>
                  <ul className="table__list">
                    {materials.map((material, k) => (
                      <li key={k}>
                        {material.name} (<span>{material.value}</span>)
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <h1 className="character__table-title">Skill talents</h1>
      <table className="character__skill table_descriptioned table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Unlock</th>
          </tr>
        </thead>
        <tbody>
          {character.data.skillTalents.map((talent, i) => (
            <Fragment key={i}>
              <tr>
                <td>
                  <Image
                    loader={() =>
                      character.data!.urls.skillTalents[talent.type]!
                    }
                    src={character.data!.urls.skillTalents[talent.type]!}
                    alt={talent.name}
                    loading="lazy"
                    width={60}
                    height={60}
                  />
                </td>
                <td>{talent.name}</td>
                <td>{talent.unlock}</td>
              </tr>
              <tr className="table__description">
                <td colSpan={3}>{talent.description}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
      <h1 className="character__table-title">Passive talents</h1>
      <table className="character__passive table_descriptioned table">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Name</th>
            <th>Unlock</th>
          </tr>
        </thead>
        <tbody>
          {character.data.passiveTalents.map((talent, i) => (
            <Fragment key={i}>
              <tr>
                <td>
                  <Image
                    loader={() => character.data!.urls.passiveTalents[i]}
                    src={character.data!.urls.passiveTalents[i]}
                    alt={talent.name}
                    loading="lazy"
                    width={60}
                    height={60}
                  />
                </td>
                <td>{talent.name}</td>
                <td>{talent.unlock}</td>
              </tr>
              <tr className="table__description">
                <td colSpan={3}>{talent.description}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
      <h1 className="character__table-title">Constellations</h1>
      <table className="character__constellations table_descriptioned table">
        <thead>
          <tr>
            <th>Level</th>
            <th>Icon</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {character.data.constellations.map((constellation, i) => (
            <Fragment key={i}>
              <tr>
                <td>{constellation.level}</td>
                <td>
                  <Image
                    loader={() => character.data!.urls.constellations[i]}
                    src={character.data!.urls.constellations[i]}
                    alt={constellation.name}
                    loading="lazy"
                    width={60}
                    height={60}
                  />
                </td>
                <td>{constellation.name}</td>
              </tr>
              <tr className="table__description">
                <td colSpan={3}>{constellation.description}</td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
      <Link
        href={character.data.urls.fandom}
        className="character__fandom link"
      >
        More information about {character.data.name}
      </Link>
    </section>
  )
}
