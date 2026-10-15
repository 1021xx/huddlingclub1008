import type { ComponentPropsWithRef } from "react";
export type RadioProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
    state?: "default" | "selected" | "disabled";
};
export default function Radio({ className = "", state = "default", disabled, defaultChecked, ...props }: RadioProps) { return <span className={`inline-flex shrink-0 size-button-md items-center justify-center ${className}`}><input {...props} type="radio" disabled={disabled || state === "disabled"} defaultChecked={props.checked === undefined ? defaultChecked ?? state === "selected" : undefined} className="radio-control cursor-pointer disabled:cursor-not-allowed"/></span>; }
