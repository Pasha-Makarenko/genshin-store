import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Weapons",
  description: "Genshin characters store",
  keywords: ["genshin", "genshin impact", "weapons"],
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="weapons">
      <div className="weapons__container">{children}</div>
    </main>
  )
}
