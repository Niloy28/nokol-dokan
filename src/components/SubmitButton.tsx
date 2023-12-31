"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const SubmitButton = ({ children, className, ...props }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button {...props} className={`btn btn-primary ${className}`} type="submit">
      {pending && <span className="loading loading-dots" />}
      {!pending && children}
    </button>
  );
};

export default SubmitButton;
