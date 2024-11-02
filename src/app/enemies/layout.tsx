import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Enemies",
  description: "Genshin characters store",
  keywords: ["genshin", "genshin impact", "enemies"],
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="enemies">
      <div className="enemies__container">{children}</div>
    </main>
  )
}
