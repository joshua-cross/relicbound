import {PropsWithChildren} from "react";

interface Props extends PropsWithChildren {
    level?: number,
}

export default function card({ children, level }: Props) {
    return (
        <div style={{ zIndex: level ?? 1 }} className="card">
            { children }
        </div>
    )
}
