"use client"

import Link from "next/link"
import Image from "next/image"
import { FC } from "react"
import logo from "@/assets/images/logo.png"
import {
  ABOUT_PATH,
  ARTIFACTS_PATH,
  BOSSES_PATH,
  CHARACTERS_PATH,
  ENEMIES_PATH,
  HOME_PATH,
  WEAPONS_PATH,
} from "@/consts/pathnames"
import Navigation, { NavigationProps } from "@/components/Navigation"
import { useMaxWidth } from "@/hooks/mediaQuery"
import Burger from "@/components/Burger"

const Header: FC = () => {
  const matches = useMaxWidth()

  const links: NavigationProps["links"] = [
    {
      href: HOME_PATH,
      label: "Home",
    },
    {
      href: ABOUT_PATH,
      label: "About",
    },
    {
      href: CHARACTERS_PATH,
      label: "Characters",
    },
    {
      href: ENEMIES_PATH,
      label: "Enemies",
    },
    {
      href: BOSSES_PATH,
      label: "Bosses",
    },
    {
      href: WEAPONS_PATH,
      label: "Weapons",
    },
    {
      href: ARTIFACTS_PATH,
      label: "Artifacts",
    },
  ]

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo" href={HOME_PATH}>
          <Image src={logo} alt="logo" width={50} height={50} />
        </Link>
        {matches ? <Navigation links={links} /> : <Burger links={links} />}
      </div>
    </header>
  )
}

export default Header
