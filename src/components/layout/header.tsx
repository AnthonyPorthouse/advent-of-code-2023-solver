import { ReactNode } from "react";

export default function Header({children}:{children: ReactNode}) {
    return <header>
        <h1 className="text-3xl">{children}</h1>
    </header>
}