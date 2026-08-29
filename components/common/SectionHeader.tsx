import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badge?: string;
  badgeVariant?: "primary" | "success" | "warning" | "error" | "neutral" | "glow";
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left" | "right";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  className,
  badge,
  badgeVariant = "primary",
  badgeIcon,
  title,
  subtitle,
  align = "center",
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-4 mb-12 sm:mb-16",
        align === "center" && "text-center items-center",
        align === "left" && "text-left items-start",
        align === "right" && "text-right items-end",
        className
      )}
      {...props}
    >
      {badge && (
        <Badge variant={badgeVariant} icon={badgeIcon} pulse dot>
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

