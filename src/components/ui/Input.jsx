"use client";
import { forwardRef } from "react";

const Input = forwardRef(
  ({ icon: Icon, id, type = "text", name, placeholder, required, maxLength, ...props }, ref) => (
    <div>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          name={name}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          className="w-full pl-12 pr-5 py-3 rounded-xl border border-border bg-input text-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
          {...props}
        />
      </div>
    </div>
  )
);

Input.displayName = "Input";
export default Input;
