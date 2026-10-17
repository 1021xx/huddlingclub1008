import type { ComponentPropsWithRef } from "react";
export type TextareaFieldProps = ComponentPropsWithRef<"textarea"> & {
    state?: "default" | "focus" | "active";
};
export default function TextareaField({ className = "", state = "default", placeholder = "게스트에게 전할 초대 글을 적어주세요", rows = 1, ...props }: TextareaFieldProps) { return <textarea {...props} rows={rows} placeholder={placeholder} data-state={state} className={`block w-full min-w-none h-field resize-y rounded-control border-[length:var(--border-width-default)] border-border-subtle bg-surface-default px-stack-md py-control-x text-input-preserved text-text-primary placeholder:text-text-disabled focus:border-action-primary focus:outline-none data-[state=focus]:border-action-primary ${className}`}/>; }
