import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  dark: "bg-ink text-white hover:bg-ink-soft",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  ghost: "bg-white/10 text-white hover:bg-white/20 backdrop-blur",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe57]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
  lg: "px-8 py-4 text-base md:text-lg",
};

interface StyleProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = StyleProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: undefined };
type ButtonAsAnchor = StyleProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = clsx(base, variants[variant], sizes[size], className);

  if (props.as === "a") {
    const { as, variant: _v, size: _s, className: _c, children: _ch, ...anchorRest } = props;
    void as;
    void _v;
    void _s;
    void _c;
    void _ch;
    return (
      <a className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as, variant: _v, size: _s, className: _c, children: _ch, ...buttonRest } = props;
  void as;
  void _v;
  void _s;
  void _c;
  void _ch;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
