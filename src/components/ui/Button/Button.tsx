import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  fullWidth = false,
  children,
  className = "",
  type = "button",
  ...props
}: Readonly<ButtonProps>) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : "",
        loading ? styles.loading : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className={styles.spinner} aria-hidden />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
