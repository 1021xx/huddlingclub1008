import type { ReactNode } from "react";
export type SectionHeaderProps = {
    className?: string;
    subtitle?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    showSubtitle?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    inverse?: boolean;
};
export default function SectionHeader({ className = "", subtitle = "Subtitle", title = "title", description = "Description", showSubtitle = true, showTitle = true, showDescription = true, inverse = false }: SectionHeaderProps) { return <header className={`flex w-full flex-col items-center gap-stack-md text-center ${className}`}>{showSubtitle && <p className={`w-full text-subtitle-preserved ${inverse ? "text-text-inverse opacity-cover-subtitle" : "text-action-secondary"}`}>{subtitle}</p>}{showTitle && <h2 className={`w-full whitespace-pre-line text-title-preserved ${inverse ? "text-text-inverse" : "text-text-primary"}`}>{title}</h2>}{showDescription && <p className={`w-full text-description-preserved ${inverse ? "text-text-inverse" : "text-text-primary"}`}>{description}</p>}</header>; }
