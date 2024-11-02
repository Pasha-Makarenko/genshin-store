import { ReactNode } from "react"
import type { Metadata } from "next"
import "@/styles/globals.scss"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Background from "@/components/Background"

export const metadata: Metadata = {
  title: "Genshin",
  description: "Genshin characters store",
  keywords: ["genshin", "genshin impact", "home"],
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Background />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
