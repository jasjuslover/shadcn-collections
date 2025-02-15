import * as React from "react";
import { cn } from "@/lib/utils";

type FloatingLabelInputProps = {
  label: string;
  rootClassName?: string;
};

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & FloatingLabelInputProps
>(({ rootClassName, className, type, id, label, required, ...props }, ref) => {
  return (
    <div className={cn("relative", rootClassName)}>
      <input
        type={type}
        id={id}
        className={cn(
          "block rounded-xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 border appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer",
          className
        )}
        placeholder=" "
        ref={ref}
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-4 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}&nbsp;{required && <span className="text-red-400">*</span>}
      </label>
    </div>
  );
});

FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
