import { cn } from "@/lib/utils";

interface ButtonCardProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightIconClassName?: string;
  onClick?: () => void;
  disabled?: boolean;
  roundedBottom?: boolean;
}

function ButtonCard({
  title,
  subtitle,
  icon,
  rightIcon,
  rightIconClassName,
  onClick,
  disabled = false,
  roundedBottom = true,
}: ButtonCardProps) {
  return (
    <div
      className={cn(
        "p-5 border flex justify-between group/button-card transition-all duration-200",
        roundedBottom ? "rounded-lg" : "rounded-t-lg",
        disabled
          ? "cursor-default opacity-70"
          : "bg-card shadow-[0_1px_12px_0_rgba(91,91,91,0.05)] hover:shadow-[0_1px_12px_0_rgba(91,91,91,0.08)] cursor-pointer"
      )}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex gap-4 items-center justify-start">
        {/* Icon */}
        <div className="w-5 h-5 flex items-center justify-center">{icon}</div>

        {/* Text Content */}
        <div className="flex flex-col gap-1.5">
          {typeof title === "string" ? (
            <span className="text-sm text-card-foreground leading-4.5 font-sans">
              {title}
            </span>
          ) : (
            title
          )}
          {subtitle &&
            (typeof subtitle === "string" ? (
              <span className="text-sm leading-4.5 text-muted-foreground font-sans">
                {subtitle}
              </span>
            ) : (
              subtitle
            ))}
        </div>
      </div>

      {rightIcon && (
        <div
          className={cn("flex items-center justify-center", rightIconClassName)}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export default ButtonCard;
