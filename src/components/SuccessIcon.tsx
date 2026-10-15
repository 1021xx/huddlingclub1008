import Check from "./icon/check";
export default function SuccessIcon({ className = "" }: {
    className?: string;
}) { return <span role="img" aria-label="완료" className={`inline-flex size-guide-inset shrink-0 items-center justify-center rounded-pill bg-info-subtle ${className}`}><Check success/></span>; }
