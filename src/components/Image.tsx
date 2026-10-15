import NextImage from "next/image";
export type ImageProps = {
    type?: "character" | "flag";
    alt?: string;
    className?: string;
};
export default function Image({ type = "character", alt = "", className = "" }: ImageProps) { const flag = type === "flag"; return <NextImage src={flag ? "/figma/flag.png" : "/figma/character.png"} alt={alt} width={flag ? 48 : 201} height={flag ? 48 : 201} className={`shrink-0 object-cover ${flag ? "size-button-md rounded-image-flag" : "size-image-character"} ${className}`}/>; }
