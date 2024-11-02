"use client"

import { FC, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useShallow } from "zustand/react/shallow"
import Utils from "@/utils/utils"
import { useBackground } from "@/store/background"
import {
  ABOUT_PATH,
  ARTIFACTS_PATH,
  BOSSES_PATH,
  CHARACTERS_PATH,
  ENEMIES_PATH,
  HOME_PATH,
  WEAPONS_PATH,
} from "@/consts/pathnames"

const Background: FC = () => {
  const [type, setType] = useBackground(
    useShallow(state => [state.type, state.setType])
  )
  const pathname = usePathname()

  useEffect(() => {
    switch (pathname) {
      case HOME_PATH:
        setType("Home")
        break
      case ABOUT_PATH:
        setType("About")
        break
      case CHARACTERS_PATH:
        setType("Characters")
        break
      case ENEMIES_PATH:
        setType("Enemies")
        break
      case BOSSES_PATH:
        setType("Bosses")
        break
      case WEAPONS_PATH:
        setType("Weapons")
        break
      case ARTIFACTS_PATH:
        setType("Artifacts")
        break
    }
  }, [pathname])

  return (
    <div
      className={`background background_${Utils.strFormatter(type.split(" ")[0])}`}
    ></div>
  )
}

export default Background
