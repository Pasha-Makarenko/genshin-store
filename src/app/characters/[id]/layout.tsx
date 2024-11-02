import { ReactNode } from "react"
import type { Metadata } from "next"
import Utils from "@/utils/utils"
import { PageItemPropsPromise } from "@/models/global"

export async function generateMetadata({
  params,
}: PageItemPropsPromise): Promise<Metadata> {
  const id = (await params).id

  return {
    title: Utils.capitalize(Utils.idToStr(id)),
    description: "Genshin characters store",
    keywords: ["genshin", "genshin impact", id],
  }
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children
}
