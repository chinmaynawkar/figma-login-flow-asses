import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";
import { Input, type InputProps } from "@/components/ui/Input";
import inputStyles from "@/components/ui/Input/Input.module.scss";
import styles from "./PasswordInput.module.scss";

export type PasswordStrength = "weak" | "medium" | "strong" | "none";

export interface PasswordInputProps extends Omit<
  InputProps,
  "type" | "endAdornment"
> {
  showStrength?: boolean;
}

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return "none";
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return "weak";
  if (score <= 3) return "medium";
  return "strong";
}

const strengthWidth: Record<PasswordStrength, string> = {
  none: "0%",
  weak: "33%",
  medium: "66%",
  strong: "100%",
};

const strengthLabel: Record<PasswordStrength, string> = {
  none: "",
  weak: "Weak password",
  medium: "Medium strength",
  strong: "Strong password",
};

export function PasswordInput({
  showStrength = true,
  value = "",
  className = "",
  ...props
}: Readonly<PasswordInputProps>) {
  const [visible, setVisible] = useState(false);
  const strength = useMemo(() => getPasswordStrength(String(value)), [value]);

  return (
    <div>
      <Input
        {...props}
        value={value}
        type={visible ? "text" : "password"}
        className={[className, inputStyles.withToggle]
          .filter(Boolean)
          .join(" ")}
        endAdornment={
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setVisible((current) => !current)}
            tabIndex={-1}
            aria-label="Toggle password visibility"
          >
            {visible ? (
              <EyeOff className="h-4 w-4" aria-hidden />
            ) : (
              <Eye className="h-4 w-4" aria-hidden />
            )}
          </button>
        }
      />

      {showStrength && strength !== "none" ? (
        <motion.div className={styles.strength} aria-hidden layout>
          <div className={styles.strengthTrack}>
            <motion.div
              className={[styles.strengthFill, styles[strength]]
                .filter(Boolean)
                .join(" ")}
              animate={{ width: strengthWidth[strength] }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className={styles.strengthLabel}>{strengthLabel[strength]}</p>
        </motion.div>
      ) : null}
    </div>
  );
}
