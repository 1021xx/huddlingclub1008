"use client";
import { useState } from "react";
import StepButton from "./StepButton";
import Minus from "./icon/minus";
import Plus from "./icon/plus";
export type StepperProps = {
    className?: string;
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    onValueChange?: (value: number) => void;
};
export default function Stepper({ className = "", value, defaultValue = 1, min = 0, max, disabled = false, onValueChange }: StepperProps) { const [internal, setInternal] = useState(defaultValue); const count = value ?? internal; function update(next: number) { const bounded = Math.max(min, Math.min(max ?? Infinity, next)); if (value === undefined)
    setInternal(bounded); onValueChange?.(bounded); } return <div className={`inline-flex items-center gap-stack-sm ${className}`}><StepButton aria-label="동반 인원 줄이기" disabled={disabled || count <= min} onClick={() => update(count - 1)} icon={<Minus compact disabled={disabled || count <= min}/>}/><output aria-live="polite" className="text-heading-md text-text-strong">{count}명</output><StepButton aria-label="동반 인원 늘리기" disabled={disabled || (max !== undefined && count >= max)} onClick={() => update(count + 1)} icon={<Plus compact/>}/></div>; }
