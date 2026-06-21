import { useId } from "react";
import { cn } from "../lib/cn";

interface BubbleItem {
  label: string;
  position: string;
  delay: string;
  duration: string;
}

interface BubbleSet {
  left: BubbleItem[];
  right: BubbleItem[];
}

/** Campaign categories — shown in Hero */
const CATEGORY_BUBBLES: BubbleSet = {
  left: [
    {
      label: "Utilities",
      position: "left-[2%] top-[18%] xl:left-[7%]",
      delay: "0s",
      duration: "4.4s",
    },
    {
      label: "Housing",
      position: "left-[0%] top-[48%] xl:left-[4%]",
      delay: "1.1s",
      duration: "5.2s",
    },
  ],
  right: [
    {
      label: "Medical",
      position: "right-[2%] top-[14%] xl:right-[8%]",
      delay: "0.5s",
      duration: "4.8s",
    },
    {
      label: "Business",
      position: "right-[0%] top-[40%] xl:right-[5%]",
      delay: "1.4s",
      duration: "5.6s",
    },
    {
      label: "Education",
      position: "right-[3%] top-[66%] xl:right-[7%]",
      delay: "0.2s",
      duration: "4.2s",
    },
  ],
};

/** Platform pillars — shown in Introducing */
const PLATFORM_BUBBLES: BubbleSet = {
  left: [
    {
      label: "Participation",
      position: "left-[1%] top-[16%] xl:left-[6%]",
      delay: "0.3s",
      duration: "4.6s",
    },
    {
      label: "Rewards credits",
      position: "left-[0%] top-[44%] xl:left-[3%]",
      delay: "1.2s",
      duration: "5.4s",
    },
  ],
  right: [
    {
      label: "Education",
      position: "right-[1%] top-[18%] xl:right-[7%]",
      delay: "0.7s",
      duration: "5s",
    },
    {
      label: "Marketing support",
      position: "right-[0%] top-[46%] xl:right-[4%]",
      delay: "0.1s",
      duration: "4.5s",
    },
    {
      label: "Your goals",
      position: "right-[2%] top-[68%] xl:right-[8%]",
      delay: "1.5s",
      duration: "5.8s",
    },
  ],
};

const BUBBLE_SETS = {
  categories: CATEGORY_BUBBLES,
  platform: PLATFORM_BUBBLES,
} as const;

export type PurposeBubbleVariant = keyof typeof BUBBLE_SETS;

interface PurposeBubblesProps {
  variant?: PurposeBubbleVariant;
  theme?: "dark" | "light";
  className?: string;
  showLines?: boolean;
}

function Bubble({ label, position, delay, duration }: BubbleItem) {
  return (
    <span
      className={`purpose-bubble absolute ${position}`}
      style={{
        animationDuration: duration,
        animationDelay: delay,
      }}
    >
      {label}
    </span>
  );
}

export function PurposeBubbles({
  variant = "categories",
  theme = "dark",
  className,
  showLines = true,
}: PurposeBubblesProps) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `purposeBubbleLine-${uid}`;
  const bubbles = BUBBLE_SETS[variant];

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 hidden lg:block",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "purpose-bubble-grid absolute inset-x-0 bottom-0 h-[55%]",
          theme === "dark"
            ? "purpose-bubble-grid--dark opacity-50"
            : "opacity-60",
        )}
      />

      {showLines === true && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 520"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#cf9f34" stopOpacity="0" />
              <stop offset="0.2" stopColor="#e8c25a" stopOpacity="0.45" />
              <stop offset="0.5" stopColor="#e8c25a" stopOpacity="0.65" />
              <stop offset="0.8" stopColor="#e8c25a" stopOpacity="0.45" />
              <stop offset="1" stopColor="#cf9f34" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 120 210 Q 320 130 520 200 T 920 240 Q 1020 260 1080 280"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {[
            [120, 210],
            [520, 200],
            [920, 240],
            [1080, 280],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="3.5"
              fill="#e8c25a"
              opacity="0.85"
            />
          ))}
        </svg>
      )}

      {[...bubbles.left, ...bubbles.right].map((bubble) => (
        <Bubble key={`${variant}-${bubble.label}`} {...bubble} />
      ))}
    </div>
  );
}
