import { ReactNode } from "react"

export enum TitleSize {
    small = "text-lg",
    medium = "text-xl",
    large = "text-2xl"
}

interface MainTitleType {
    children: ReactNode,
    textSize?: TitleSize
}

export default function MainTitle({ children, textSize = TitleSize.large }: MainTitleType) {
    return (
        <h1 className={`${textSize} font-semibold`}>{children}</h1>
    )
}