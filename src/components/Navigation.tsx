import ALink, { ALinkProps } from "@/components/ALink"
import { FC } from "react"

export interface NavigationProps {
  links: Array<ALinkProps>
}

const Navigation: FC<NavigationProps> = props => {
  return (
    <nav className="navigation">
      {props.links.map((l, i) => (
        <ALink {...l} key={i} />
      ))}
    </nav>
  )
}

export default Navigation
