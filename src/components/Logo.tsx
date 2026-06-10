import Image from "next/image";
import { cn } from "@/lib/cn";
import logoIcon from "../../public/new-logo.png";

type LogoProps = {
  /** Height in pixels for the icon. */
  size?: number;
  /** Show just the icon mark, no wordmark. */
  markOnly?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({
  size = 32,
  markOnly = false,
  className,
  priority = false,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src={logoIcon}
        alt="biTurbo"
        width={size * 2}
        height={size * 2}
        sizes={`${size}px`}
        quality={100}
        priority={priority}
        className="block invert"
        style={{ width: size, height: size }}
      />
      {!markOnly && (
        <span
          className="font-display text-ink tracking-tight"
          style={{ fontSize: Math.round(size * 0.75), fontWeight: 700 }}
        >
          biTurbo
        </span>
      )}
    </span>
  );
}
