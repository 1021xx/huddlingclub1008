"use client";
import { useId } from "react";
import Radio, { type RadioProps } from "./Radio";
import Label from "./Label";
export type RadioOptionProps = RadioProps & {
    label?: string;
    showRequired?: boolean;
};
export default function RadioOption({ id, label = "Label", showRequired = true, className = "", ...props }: RadioOptionProps) { const autoId = useId(); const fieldId = id ?? autoId; return <div className={`inline-flex items-center ${className}`}><Radio {...props} id={fieldId}/><Label htmlFor={fieldId} label={label} required={showRequired}/></div>; }
