import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Nav data (mega menu, footer) carries paths as strings, so it cannot use the
 * literal-typed `to` prop of <Link> directly. This wrapper keeps a single cast
 * in one audited place and honours `hash` for in-page jumps.
 */
export function SmartLink({
  to,
  hash,
  children,
  className,
  activeClassName,
  onClick,
}: {
  to: string;
  hash?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
  activeClassName?: string | undefined;
  onClick?: (() => void) | undefined;
}) {
  return (
    <Link
      to={to as never}
      hash={hash as never}
      onClick={onClick}
      className={cn(className)}
      {...(activeClassName ? { activeProps: { className: cn(className, activeClassName) } } : {})}
    >
      {children}
    </Link>
  );
}
