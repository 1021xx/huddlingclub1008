import Image from "next/image";
export default function Check({ className = "", success = false }: {
    className?: string;
    success?: boolean;
}) { return <Image alt="" aria-hidden="true" src={success ? "/figma/1006-imgIconCheck.svg" : "/figma/1074-imgIconCheck.svg"} width={success ? 32 : 24} height={success ? 32 : 24} className={`shrink-0 ${success ? "size-section" : "size-stack-lg"} ${className}`}/>; }
