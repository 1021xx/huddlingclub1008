"use client";
import { useId } from "react";
import Label from "./Label";
import InputField, { type InputFieldProps } from "./InputField";
export type InputProps = InputFieldProps & {
    label?: string;
    helper?: string;
    showHelper?: boolean;
};
export default function Input({ id, label = "Label", helper = "안내 문구", showHelper = false, required = true, className = "", ...props }: InputProps) { const autoId = useId(); const fieldId = id ?? autoId; return <div className={`flex w-full flex-col items-start gap-inline-compact ${className}`}><Label htmlFor={fieldId} label={label} required={required}/><InputField {...props} id={fieldId} required={required} aria-describedby={showHelper ? fieldId + "-helper" : props["aria-describedby"]}/>{showHelper && <p id={fieldId + "-helper"} className="text-caption-md text-text-tertiary">{helper}</p>}</div>; }
