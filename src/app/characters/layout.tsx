import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Characters",
  description: "Genshin characters store",
  keywords: ["genshin", "genshin impact", "characters"],
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="characters">
      <div className="characters__container">{children}</div>
    </main>
  )
}
