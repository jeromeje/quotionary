
import React from "react";
import { cn } from "@/lib/utils";
import { ButtonCustom } from "./ui/button-custom";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  ctaText,
  ctaLink,
  icon,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 animate-fade-in",
        className
      )}
    >
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-xl font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">{description}</p>
      
      {ctaText && ctaLink && (
        <ButtonCustom asChild variant="default">
          <Link to={ctaLink}>{ctaText}</Link>
        </ButtonCustom>
      )}
    </div>
  );
};

export default EmptyState;
