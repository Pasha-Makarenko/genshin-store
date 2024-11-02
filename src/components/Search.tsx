"use client"

import { Dispatch, SetStateAction, FC, FormEventHandler } from "react"
import Image from "next/image"
import Link from "next/link"
import { Item } from "@/models/services"
import Utils from "@/utils/utils"
import icon from "@/assets/images/search-icon.png"

export interface SearchProps {
  search: string
  setSearch: Dispatch<SetStateAction<SearchProps["search"]>>
  onSubmit: () => void
  items: Array<Item["id"]>
  baseURLByID: (id: Item["id"]) => string
}

const Search: FC<SearchProps> = props => {
  const submitHandler: FormEventHandler = event => {
    event.preventDefault()

    if (props.onSubmit) {
      props.onSubmit()
    }
  }

  return (
    <form
      className={`search ${props.search ? "search_active" : ""}`.trim()}
      onSubmit={submitHandler}
    >
      <input
        type="text"
        placeholder="Search..."
        className="search__input"
        value={props.search}
        onChange={event => props.setSearch(event.target.value)}
      />
      <button className="search__icon" type="submit">
        <Image src={icon} alt="icon" width={25} height={25} />
      </button>
      {props.search ? (
        <ul className="search__list">
          {props.items
            .filter(item => Utils.strIncludes(item, props.search))
            .map((item, i) => (
              <li className="search__item" key={i}>
                <Link href={props.baseURLByID(item)} type="submit">
                  {Utils.capitalize(item)}
                </Link>
              </li>
            ))}
        </ul>
      ) : null}
    </form>
  )
}

export default Search
