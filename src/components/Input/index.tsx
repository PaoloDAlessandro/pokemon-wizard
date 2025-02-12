import * as React from "react";

import { cn } from "../../lib/utils";
import { Label } from "../Label";

export interface InputProps extends Pick<React.InputHTMLAttributes<HTMLInputElement>, "type" | "id" | "name" | "value" | "onChange" | "className"> {
  label?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, label, errorMessage, ...props }, ref) => {
  return (
    <div className="flex flex-col h-[76px]">
      <div className="flex flex-col gap-y-1">
        {label && <Label htmlFor={props.name}>{label}</Label>}
        <input
          type={type}
          className={cn("flex h-10 w-full rounded-md border border-input shadow-sm bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50", className)}
          ref={ref}
          {...props}
        />
      </div>
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
