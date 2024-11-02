import Link from "next/link"
import { FC } from "react"
import { CREATOR_URL } from "@/consts/urls"

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <span>Created by</span>
        <Link href={CREATOR_URL} className="link">
          &copy;Pasha-Makarenko
        </Link>
      </div>
    </footer>
  )
}

export default Footer
