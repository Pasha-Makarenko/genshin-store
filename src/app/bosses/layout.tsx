import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bosses",
  description: "Genshin characters store",
  keywords: ["genshin", "genshin impact", "bosses"],
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="bosses">
      <div className="bosses__container">{children}</div>
    </main>
  )
}
