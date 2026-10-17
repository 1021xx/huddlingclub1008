import type { ReactNode } from "react";
import None from "./icon/none";
export default function NavBar({ className = "", title = "Label", left, right }: {
    className?: string;
    title?: string;
    left?: ReactNode;
    right?: ReactNode;
}) { return <nav aria-label={title} className={`flex h-nav-bar w-full items-center gap-section p-page-horizontal ${className}`}>{left ?? <None />}<p className="min-w-none flex-1 text-center text-nav-preserved text-text-primary">{title}</p>{right ?? <None />}</nav>; }
