import Link from "next/link"
import { useRouter } from "next/navigation"
import { MouseEventHandler, FC } from "react"

export interface ALinkProps {
  href: string
  label: string
  onClick?: MouseEventHandler
}

const ALink: FC<ALinkProps> = props => {
  const router = useRouter()

  const clickHandler: MouseEventHandler = event => {
    if (props?.onClick) {
      props.onClick(event)
    }

    router.push(props.href)
  }

  return (
    <Link href={props.href} legacyBehavior>
      <a className="link" onClick={clickHandler}>
        {props.label}
      </a>
    </Link>
  )
}

export default ALink
