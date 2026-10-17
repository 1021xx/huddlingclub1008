export default function Check({ className = "", success = false }: {
  className?: string;
  success?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 ${success ? "size-section text-info-strong" : "size-stack-lg text-text-tertiary"} ${className}`}
    >
      <path d="M4.5 12L9.5 16L18.5 7" stroke="currentColor" strokeWidth="var(--spacing-inline-xs)" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
