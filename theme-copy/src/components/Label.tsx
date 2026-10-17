import type { ComponentPropsWithoutRef } from "react";
export type LabelProps = ComponentPropsWithoutRef<"label"> & {
    label?: string;
    required?: boolean;
};
export default function Label({ label = "Label", required = true, children, className = "", ...props }: LabelProps) { return <label {...props} className={`inline-flex items-center gap-inline-sm whitespace-nowrap ${className}`}><span className="text-label-preserved text-text-strong">{children ?? label}</span>{required && <span className="text-required-preserved text-feedback-error">필수</span>}</label>; }
