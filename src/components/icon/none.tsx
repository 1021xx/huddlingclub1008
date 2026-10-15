export default function None({ className = "" }: {
    className?: string;
}) { return <span aria-hidden="true" className={`inline-block shrink-0 size-stack-lg ${className}`}/>; }
