import type { ComponentPropsWithRef } from "react";
export type InputFieldProps = ComponentPropsWithRef<"input"> & {
    state?: "default" | "focus" | "active";
};
export default function InputField({ className = "", state = "default", placeholder = "placeholder", ...props }: InputFieldProps) { return <input {...props} placeholder={placeholder} data-state={state} className={`block w-full min-w-none h-field rounded-control border-[length:var(--border-width-default)] border-border-subtle bg-surface-default px-stack-md py-control-x text-input-preserved text-text-primary placeholder:text-text-disabled focus:border-action-primary focus:outline-none data-[state=focus]:border-action-primary ${className}`}/>; }
