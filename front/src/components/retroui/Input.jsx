import React from "react";

/** Versão mínima do Input do RetroUI (retroui.dev). */
export const Input = ({ type = "text", className = "", ...props }) => {
  return (
    <input
      type={type}
      className={`w-full rounded border-2 border-border px-4 py-2 shadow-[3px_3px_0_0_var(--color-border)] transition focus:shadow-[1px_1px_0_0_var(--color-border)] focus:outline-none ${className}`}
      {...props}
    />
  );
};
