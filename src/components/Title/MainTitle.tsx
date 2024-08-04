import { ReactNode } from "react"
import { TitleSize } from "../../types/const"

interface MainTitleType {
    children: ReactNode,
    textSize?: TitleSize
}

export default function MainTitle({ children, textSize = TitleSize.large }: MainTitleType) {
    return (
        <h1 className={`${textSize} font-semibold`}>{children}</h1>
    )
}