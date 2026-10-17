import type { ComponentPropsWithRef } from "react";

export type ButtonProps = ComponentPropsWithRef<"button"> & {
  size?: "sm" | "md" | "lg";
  /** Figma 상태 미리보기용. 실제 hover와 disabled도 자동 적용됩니다. */
  state?: "default" | "hover" | "disabled";
  label?: string;
};

const sizeClasses = {
  sm: "gap-control-compact py-inline-sm text-label-md bg-action-primary",
  md: "h-button-md gap-inline-compact py-control-x text-label-md bg-text-secondary",
  lg: "h-button-lg gap-control-compact py-inline-sm text-label-lg bg-action-primary",
} as const;

/** Figma Button (2168:1089). 시각 값은 globals.css의 토큰만 사용합니다. */
export default function Button({
  size = "sm",
  state = "default",
  label = "Button",
  children,
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || state === "disabled"}
      data-state={state}
      className={[
        "party-button inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-control px-control-y font-sans text-center text-text-inverse",
        "enabled:cursor-pointer disabled:cursor-not-allowed disabled:bg-border-subtle",
        "enabled:hover:button-hover enabled:data-[state=hover]:button-hover",
        "focus-visible:outline-solid focus-visible:outline-[length:var(--spacing-inline-xs)] focus-visible:outline-offset-[var(--spacing-inline-xs)] focus-visible:outline-border-accent",
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children ?? label}
    </button>
  );
}
