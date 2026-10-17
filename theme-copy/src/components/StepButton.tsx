import type { ComponentPropsWithRef, ReactNode } from "react";
import Minus from "./icon/minus";
export type StepButtonProps = ComponentPropsWithRef<"button"> & {
    state?: "default" | "disabled";
    icon?: ReactNode;
};
export default function StepButton({ state = "default", disabled, icon, children, className = "", type = "button", ...props }: StepButtonProps) { const inactive = disabled || state === "disabled"; return <button {...props} type={type} disabled={inactive} className={`inline-flex size-step-button shrink-0 items-center justify-center rounded-control border-[length:var(--border-width-default)] border-border-default bg-surface-default enabled:cursor-pointer disabled:cursor-not-allowed focus-visible:component-focus ${className}`}>{children ?? icon ?? <Minus compact disabled={inactive}/>}</button>; }
