import { FC, PropsWithChildren } from "react"
import Image from "next/image"
import error from "@/assets/images/error.png"

const Error: FC<PropsWithChildren> = props => {
  return (
    <div className="error">
      <Image src={error} alt="error" width={60} height={60} />
      <div>{props.children}</div>
    </div>
  )
}

export default Error
