import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Artifacts",
  description: "Genshin characters store",
  keywords: ["genshin", "genshin impact", "artifacts"],
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="artifacts">
      <div className="artifacts__container">{children}</div>
    </main>
  )
}
