"use client";
import { useId } from "react";
import Label from "./Label";
import TextareaField, { type TextareaFieldProps } from "./TextareaField";
export type TextareaProps = Omit<TextareaFieldProps, "rows"> & {
    rows?: 2 | 4;
    label?: string;
    helper?: string;
    showHelper?: boolean;
};
export default function Textarea({ id, rows = 4, label = "Label", helper = "엔터로 줄을 나눌 수 있어요", showHelper = false, required = true, className = "", ...props }: TextareaProps) { const autoId = useId(); const fieldId = id ?? autoId; return <div className={`flex w-full flex-col items-start gap-inline-compact ${className}`}><Label htmlFor={fieldId} label={label} required={required}/><TextareaField {...props} id={fieldId} rows={rows} required={required} className={rows === 2 ? "h-textarea-short" : "h-textarea-long"} aria-describedby={showHelper ? fieldId + "-helper" : props["aria-describedby"]}/>{showHelper && <p id={fieldId + "-helper"} className="text-caption-md text-text-tertiary">{helper}</p>}</div>; }
