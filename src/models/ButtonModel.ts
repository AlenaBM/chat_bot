export interface IButton {
    type: "button" | "submit" | "reset",
    content?: string,
    children?: React.ReactNode,
    className?: string,
    actionHadler?: () => void
}