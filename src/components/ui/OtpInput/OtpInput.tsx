import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import styles from "./OtpInput.module.scss";

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

function splitOtp(value: string, length: number): string[] {
  const digits = value.replace(/\D/g, "").slice(0, length);
  return Array.from({ length }, (_, index) => digits[index] ?? "");
}

export function OtpInput({
  length = 4,
  value,
  onChange,
  error,
  disabled = false,
  autoFocus = false,
}: Readonly<OtpInputProps>) {
  const digits = useMemo(() => splitOtp(value, length), [value, length]);
  const slots = useMemo(
    () =>
      Array.from({ length }, () => ({
        id: crypto.randomUUID(),
      })),
    [length],
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    if (autoFocus && !disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus, disabled]);

  const updateDigits = (nextDigits: string[]) => {
    onChange(nextDigits.join(""));
  };

  const focusIndex = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (raw && !digit) {
      return;
    }

    const next = [...digits];
    next[index] = digit;
    updateDigits(next);

    if (digit && index < length - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        updateDigits(next);
        return;
      }

      if (index > 0) {
        const next = [...digits];
        next[index - 1] = "";
        updateDigits(next);
        focusIndex(index - 1);
      }
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) {
      return;
    }

    const next = splitOtp(pasted, length);
    updateDigits(next);
    focusIndex(Math.min(pasted.length, length) - 1);
  };

  return (
    <div className={styles.field}>
      <div
        className={[styles.boxes, error ? styles.hasError : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {slots.map((slot, position) => {
          const digit = digits[position] ?? "";

          return (
            <input
              key={slot.id}
              ref={(element) => {
                inputRefs.current[position] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={position === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              disabled={disabled}
              aria-label={`OTP digit ${position + 1}`}
              aria-invalid={Boolean(error)}
              onChange={(event) =>
                handleChange(position, event.target.value)
              }
              onKeyDown={(event) => handleKeyDown(position, event)}
              onPaste={handlePaste}
              className={[styles.box, digit ? styles.filled : ""]
                .filter(Boolean)
                .join(" ")}
            />
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            key="otp-error"
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            className={styles.errorMessage}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
