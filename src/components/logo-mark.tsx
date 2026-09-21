export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <rect
        x="2.5"
        y="2.5"
        width="95"
        height="95"
        rx="9"
        fill="#1B1B4C"
        stroke="#00BFF3"
        strokeWidth="5"
      />
      <path
        d="M51 7C56 22 84 33 84 55A35 35 0 0 1 14 55C14 35 45 23 51 7Z"
        fill="#00BFF3"
      />
      <path
        d="M76.5 53A28 28 0 0 1 53 82"
        fill="none"
        stroke="#1B1B4C"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
