import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          "flex w-full rounded-md bg-stone-700 px-3 py-3 text-sm file:border=0 file:bg-transparent file: font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-70 focus:outline-none border-cyan-600 border-2 focus:border-cyan-400",
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      ></input>
    );
  }
);

Input.displayName = "input";
