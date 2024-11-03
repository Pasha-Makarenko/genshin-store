import Image from "next/image"
import Link from "next/link"
import background from "@/assets/images/home-background.png"
import { CHARACTERS_PATH } from "@/consts/pathnames"

export default function Home() {
  return (
    <>
      <main className="home">
        <Image
          src={background}
          alt="home background"
          className="home__background"
          priority={true}
        />
        <section className="home__container">
          <div className="home__card card-home">
            <h1 className="card-home__title">Genshin store</h1>
            <p className="card-home__description">
              Genshin Store is a platform where you can view all the characters,
              enemies, bosses, etc. from the game Genshin Impact.
            </p>
            <Link className="card-home__btn" href={CHARACTERS_PATH}>
              Let&apos;s start
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
