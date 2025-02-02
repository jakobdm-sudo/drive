import { type ReactNode } from "react";

interface ButtonProps {
  name: string | ReactNode;
  hasLogo?: boolean;
  logo?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  name,
  hasLogo = false,
  logo,
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md px-4 py-2 text-primary-foreground ${className}`}
    >
      {hasLogo && logo}
      {name}
    </button>
  );
}
