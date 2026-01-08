import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    level?: number,
}

export default function card({ children, level }: Props) {
    return (
        <div
            style={{ zIndex: level ?? 1 }}
            className="card h-96 w-full p-6 flex items-end bg-card border-border
            border rounded-xl shadow-xl cursor-grab active:cursor-grabbing"
        >
            <div className="content">
                { children }
            </div>
        </div>
    )
}
