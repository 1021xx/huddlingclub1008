import Image from "next/image";
export default function Minus({ className = "", compact = false, disabled = false }: {
    className?: string;
    compact?: boolean;
    disabled?: boolean;
}) { return <Image alt="" aria-hidden="true" src={compact ? disabled ? "/figma/1020-imgIconMinus1.svg" : "/figma/1020-imgIconMinus.svg" : "/figma/1018-imgIconMinus.svg"} width={compact ? 20 : 24} height={compact ? 20 : 24} className={`shrink-0 ${compact ? "size-page-horizontal" : "size-stack-lg"} ${className}`}/>; }
