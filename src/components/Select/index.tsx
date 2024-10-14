import { FieldInputProps } from "formik";
import React from "react";
import { Label } from "../Label";
import { SelectContent, SelectItem, Select as SelectPrimitive, SelectTrigger, SelectValue } from "./Primitive";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends FieldInputProps<string> {
  options: Option[];
  placeholder?: string;
  className?: string;
  label?: string;
  errorMessage?: string;
}

const Select: React.FC<SelectProps> = ({ options, placeholder, className, label, errorMessage, ...field }) => {
  return (
    <div className="flex flex-col h-[76px]">
      <div className="flex flex-col gap-y-1">
        {label && <Label htmlFor={field.name}>{label}</Label>}
        <SelectPrimitive
          value={field.value}
          onValueChange={field.onChange(field.name)}
          name={field.name}
          onOpenChange={(open) => {
            if (!open) {
              field.onBlur(field.name);
            }
          }}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} className="capitalize" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} className="capitalize">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPrimitive>
      </div>
      {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>
  );
};

export default Select;
