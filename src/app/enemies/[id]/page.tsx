"use client"

import Link from "next/link"
import Image from "next/image"
import Loader from "@/components/Loader"
import { Fragment, ReactNode, useEffect } from "react"
import { useShallow } from "zustand/react/shallow"
import Utils from "@/utils/utils"
import { useEnemies } from "@/store/enemies"
import { useBackground } from "@/store/background"
import { Enemy, ChurlsEnemy, FatuiEnemy } from "@/models/enemies"
import { PageItemProps } from "@/models/global"
import { ENDPOINTS } from "@/consts/services"
import { ARTIFACTS_PATH_BY_ID } from "@/consts/pathnames"
import Error from "@/components/Error"

export default function Character({ params: { id } }: PageItemProps) {
  const setType = useBackground(useShallow(state => state.setType))
  const enemy = useEnemies(
    useShallow(state => ({
      ...state,
      data: Object.entries(state.data)
        .map(([, data]) => data.content)
        .flat()
        .find(item => item.id === id),
    }))
  )

  useEffect(() => {
    enemy.getItemByID(id).then(_ => _)
  }, [])

  useEffect(() => {
    if (enemy.data) {
      setType(`Enemies-${enemy.data.type}`)
    } else if (enemy.error.getOne) {
      setType("Error")
    }
  }, [enemy])

  const curlsEnemy: (data: ChurlsEnemy) => ReactNode = data => {
    return (
      <>
        <tr>
          <td>{data.name}</td>
          <td>
            {ENDPOINTS.NATION.ICON(data.region) !== "" ? (
              <div className="table__flex">
                <Image
                  loader={() => ENDPOINTS.NATION.ICON(data.region)}
                  src={ENDPOINTS.NATION.ICON(data.region)}
                  alt={data.region}
                  loading="lazy"
                  onError={e => {
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                  width={30}
                  height={30}
                />
                <div>{data.region}</div>
              </div>
            ) : (
              data.region
            )}
          </td>
        </tr>
        <tr className="table__description">
          <td colSpan={2}>{data.description}</td>
        </tr>
      </>
    )
  }

  const fatuiEnemy: (data: FatuiEnemy) => ReactNode = data => {
    return (
      <>
        <tr>
          <td>{data.name}</td>
          <td>{data.type}</td>
          <td>
            <div className="table__flex">
              <Image
                loader={() => ENDPOINTS.VISION.ICON(data.element)}
                src={ENDPOINTS.VISION.ICON(data.element)}
                alt={data.element}
                loading="lazy"
                onError={e => {
                  ;(e.target as HTMLImageElement).style.display = "none"
                }}
                width={30}
                height={30}
              />
              <div>{data.element}</div>
            </div>
          </td>
        </tr>
      </>
    )
  }

  const specificEnemy: (data: Enemy) => ReactNode = data => {
    let node: ReactNode

    switch (data.id) {
      case "mitachurl":
        node = (
          <>
            <h3 className="item__subtitle">Mitachurl types</h3>
            <table className="item__table table_descriptioned table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {curlsEnemy(data["wooden-shieldwall-mitachurl"]!)}
                {curlsEnemy(data["rock-shieldwall-mitachurl"]!)}
                {curlsEnemy(data["ice-shieldwall-mitachurl"]!)}
                {curlsEnemy(data["blazing-axe-mitachurl"]!)}
                {curlsEnemy(data["crackling-axe-mitachurl"]!)}
              </tbody>
            </table>
          </>
        )
        break
      case "lawachurl":
        node = (
          <>
            <h3 className="item__subtitle">Lawachurl</h3>
            <table className="item__table table_descriptioned table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Region</th>
                </tr>
              </thead>
              <tbody>
                {curlsEnemy(data["stonehide-lawachurl"]!)}
                {curlsEnemy(data["frostarm-lawachurl"]!)}
              </tbody>
            </table>
          </>
        )
        break
      case "fatui-skirmisher":
        node = (
          <>
            <h3 className="item__subtitle">Fatui Skirmisher types</h3>
            <table className="item__table table_descriptioned table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Element</th>
                </tr>
              </thead>
              <tbody>
                {fatuiEnemy(data["hydrogunner-legionnaire"]!)}
                {fatuiEnemy(data["cryogunner-legionnaire"]!)}
                {fatuiEnemy(data["geochanter-bracers"]!)}
                {fatuiEnemy(data["pyroslinger-bracers"]!)}
                {fatuiEnemy(data["anemoboxer-vanguard"]!)}
                {fatuiEnemy(data["electrohammer-vanguard"]!)}
              </tbody>
            </table>
          </>
        )
        break
    }

    return node
  }

  if (enemy.error.getOne) {
    return <Error>Unable to fetch emeny</Error>
  }

  if (enemy.loading.getOne || !enemy.data) {
    return <Loader />
  }

  return (
    <section className="enemy item">
      <div className="item__info">
        <Image
          loader={() => enemy.data!.urls.portrait || ""}
          src={enemy.data.urls.portrait || ""}
          alt={enemy.data.name}
          width={1000}
          height={2000}
          onError={e => {
            ;(e.target as HTMLImageElement).style.display = "none"
          }}
          className="item__card"
          layout="responsive"
          loading="lazy"
        />
        <div className="item__content">
          <h1 className="item__name">{enemy.data.name}</h1>
          {enemy.data.title ? (
            <h1 className="item__name">{enemy.data.title}</h1>
          ) : null}
          {enemy.data.description && enemy.data.description !== "N/A" ? (
            <p className="item__description">{enemy.data.description}</p>
          ) : null}
          <table className="item__table table">
            <tbody>
              <tr>
                <td>Type</td>
                <td>{enemy.data.type}</td>
              </tr>
              <tr>
                <td>Region</td>
                <td>
                  {ENDPOINTS.NATION.ICON(enemy.data.region) !== "" ? (
                    <div className="table__flex">
                      <Image
                        loader={() => ENDPOINTS.NATION.ICON(enemy.data!.region)}
                        src={ENDPOINTS.NATION.ICON(enemy.data.region)}
                        alt={enemy.data.region}
                        loading="lazy"
                        onError={e => {
                          ;(e.target as HTMLImageElement).style.display = "none"
                        }}
                        width={30}
                        height={30}
                      />
                      <div>{enemy.data.region}</div>
                    </div>
                  ) : (
                    enemy.data.region
                  )}
                </td>
              </tr>
              <tr>
                <td>Family</td>
                <td>{enemy.data.family}</td>
              </tr>
              {enemy.data.faction ? (
                <tr>
                  <td>Faction</td>
                  <td>{enemy.data.faction}</td>
                </tr>
              ) : null}
              {enemy.data.elements ? (
                <tr>
                  <td>Elements</td>
                  <td>
                    {enemy.data.elements.map((element, i) =>
                      element !== "N/A" ? (
                        <div className="table__flex" key={i}>
                          <Image
                            loader={() => ENDPOINTS.VISION.ICON(element)}
                            src={ENDPOINTS.VISION.ICON(element)}
                            alt={element}
                            loading="lazy"
                            onError={e => {
                              ;(e.target as HTMLImageElement).style.display =
                                "none"
                            }}
                            width={30}
                            height={30}
                          />
                          <div>{element}</div>
                        </div>
                      ) : (
                        element
                      )
                    )}
                  </td>
                </tr>
              ) : null}
              {enemy.data["mora-gained"] ? (
                <tr>
                  <td>Mora</td>
                  <td>{enemy.data["mora-gained"]}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
      {enemy.data.descriptions ? (
        <>
          <h3 className="item__subtitle">Descriptions</h3>
          {enemy.data.descriptions.map((desc, i) => (
            <article className="item__article article" key={i}>
              <h1 className="article__title">{desc.name}</h1>
              <p className="article__description">{desc.description}</p>
            </article>
          ))}
        </>
      ) : null}
      {enemy.data["elemental-descriptions"] ? (
        <>
          <h3 className="item__subtitle">Elemental descriptions</h3>
          {enemy.data["elemental-descriptions"].map((desc, i) => (
            <article className="item__article article" key={i}>
              <h1 className="article__title article__title_flex">
                <Image
                  loader={() => ENDPOINTS.VISION.ICON(desc.element)}
                  src={ENDPOINTS.VISION.ICON(desc.element)}
                  alt={desc.element}
                  loading="lazy"
                  width={30}
                  height={30}
                  onError={e => {
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                />
                <div>{desc.element}</div>
              </h1>
              <p className="article__description">{desc.description}</p>
            </article>
          ))}
        </>
      ) : null}
      {enemy.data.drops && enemy.data.drops !== "None" ? (
        <>
          <h3 className="item__subtitle">Drops</h3>
          <table className="item__table table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rarity</th>
                <th>Min level</th>
              </tr>
            </thead>
            <tbody>
              {enemy.data.drops.map((drop, i) => (
                <tr key={i}>
                  <td>{drop.name}</td>
                  <td>
                    <div className="rarity">
                      {new Array(drop.rarity).fill(null).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                  </td>
                  <td>{drop["minimum-level"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
      {enemy.data.artifacts ? (
        <>
          <h3 className="item__subtitle">Artifacts</h3>
          <table className="item__table table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Set</th>
                <th>Rarity</th>
              </tr>
            </thead>
            <tbody>
              {enemy.data.artifacts.map((artifact, i) => (
                <tr key={i}>
                  <td>{artifact.name}</td>
                  <td>
                    <Link
                      href={ARTIFACTS_PATH_BY_ID(Utils.strToID(artifact.set))}
                      className="link"
                    >
                      {artifact.set}
                    </Link>
                  </td>
                  <td>
                    <div className="rarity">
                      {artifact.rarity
                        .split("/")
                        .map(r => parseInt(r))
                        .map((r, i) => (
                          <Fragment key={i}>
                            {i > 0 ? (
                              <span className="rarity__separator">{" / "}</span>
                            ) : null}
                            {new Array(r).fill(null).map((_, k) => (
                              <span key={k}>★</span>
                            ))}
                          </Fragment>
                        ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
      {specificEnemy(enemy.data)}
      <Link href={enemy.data.urls.fandom} className="item__fandom link">
        More information about {enemy.data.name}
      </Link>
    </section>
  )
}
