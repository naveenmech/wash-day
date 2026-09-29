import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "max-w-2xl mb-12",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      <span
        className={clsx(
          "inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3",
          light ? "text-accent" : "text-accent"
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={clsx(
          "font-display text-4xl md:text-5xl leading-none mb-4",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={clsx("text-base md:text-lg", light ? "text-white/70" : "text-ink/60")}>
          {description}
        </p>
      )}
    </div>
  );
}
