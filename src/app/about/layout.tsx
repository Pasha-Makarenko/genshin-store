import { ReactNode } from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "Genshin characters store",
  keywords: ["genshin", "genshin impact", "about"],
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <main className="about">
        <div className="about__container">{children}</div>
      </main>
    </>
  )
}
