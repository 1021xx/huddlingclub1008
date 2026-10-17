import Image from "next/image";
export default function Plus({ className = "", compact = false }: {
    className?: string;
    compact?: boolean;
}) { return <Image alt="" aria-hidden="true" src={compact ? "/figma/1025-imgIconPlus.svg" : "/figma/1016-imgIconPlus.svg"} width={compact ? 20 : 24} height={compact ? 20 : 24} className={`shrink-0 ${compact ? "size-page-horizontal" : "size-stack-lg"} ${className}`}/>; }
