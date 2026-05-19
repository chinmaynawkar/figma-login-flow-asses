import { AnimatePresence, motion } from "framer-motion";
import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import styles from "./Input.module.scss";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string | null;
  hint?: string;
  required?: boolean;
  containerClassName?: string;
  endAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      className = "",
      containerClassName = "",
      endAdornment,
      disabled,
      id,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;
    const hasValue =
      value !== undefined && value !== null && String(value).length > 0;

    return (
      <motion.div layout className={`${styles.field} ${containerClassName}`}>
        {label ? (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required ? <span className={styles.required}>*</span> : null}
          </label>
        ) : null}

        <div className={styles.inputWrap}>
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            value={value}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? errorId : hint ? hintId : undefined
            }
            className={[
              styles.control,
              error ? styles.error : "",
              hasValue && !error ? styles.filled : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />
          {endAdornment}
        </div>

        <AnimatePresence initial={false}>
          {error ? (
            <motion.p
              key="error"
              id={errorId}
              role="alert"
              aria-live="polite"
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.2 }}
              className={styles.errorMessage}
            >
              {error}
            </motion.p>
          ) : hint ? (
            <motion.p
              key="hint"
              id={hintId}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className={styles.hint}
            >
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </motion.div>
    );
  },
);

Input.displayName = "Input";
