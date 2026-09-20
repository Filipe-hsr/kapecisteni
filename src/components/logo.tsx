import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  inverted?: boolean;
};

export function Logo({ className, markClassName, inverted = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("size-10 shrink-0", markClassName)} inverted={inverted} />
      <span className="leading-none">
        <span
          className={cn(
            "block text-[1.35rem] font-extrabold tracking-[-0.04em]",
            inverted ? "text-cyan" : "text-cyan"
          )}
        >
          KAPE
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[0.68rem] font-medium tracking-tight",
            inverted ? "text-white/55" : "text-mist"
          )}
        >
          čištění s.r.o.
        </span>
      </span>
    </span>
  );
}

export function LogoMark({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  const stroke = inverted ? "#00A8FF" : "#00A8FF";
  const fill = inverted ? "#00A8FF" : "#00A8FF";

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect
        x="2.8"
        y="2.8"
        width="42.4"
        height="42.4"
        rx="12"
        stroke={stroke}
        strokeWidth="3.4"
      />
      <path
        d="M24 12.2c6.4 7.1 9.4 12.2 9.4 16.1 0 5.1-4.1 8.9-9.4 8.9s-9.4-3.8-9.4-8.9c0-3.9 3-9 9.4-16.1Z"
        fill={fill}
      />
      <path
        d="M21.2 21.6c1.6-1.8 3.4-2.7 4.6-3"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
