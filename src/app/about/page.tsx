import Link from "next/link"
import { API_URL, CREATOR_URL, GRADIENTS_URL, PROJECT_URL } from "@/consts/urls"

export default function About() {
  return (
    <section className="about__content">
      <h1 className="about__title">About project</h1>
      <h3 className="about__subtitle">Resources</h3>
      <ul className="about__list">
        <li className="about__item">
          <Link href={API_URL} target="_blank" className="link">
            API
          </Link>
        </li>
        <li className="about__item">
          <Link href={GRADIENTS_URL} target="_blank" className="link">
            Gradients
          </Link>
        </li>
        <li className="about__item">
          <Link href={CREATOR_URL} target="_blank" className="link">
            Creator
          </Link>
        </li>
        <li className="about__item">
          <Link href={PROJECT_URL} target="_blank" className="link">
            Source code
          </Link>
        </li>
      </ul>
    </section>
  )
}
