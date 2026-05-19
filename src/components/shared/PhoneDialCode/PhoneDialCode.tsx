import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DIAL_CODES } from "@/lib/constants";
import styles from "./PhoneDialCode.module.scss";

export interface PhoneDialCodeProps {
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}

export function PhoneDialCode({
  value,
  onChange,
  disabled = false,
}: Readonly<PhoneDialCodeProps>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => DIAL_CODES.find((entry) => entry.code === value) ?? DIAL_CODES[0],
    [value],
  );

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        type="button"
        disabled={disabled}
        aria-label={`Country code ${selected.code}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={styles.trigger}
      >
        <span>
          {selected.flag} {selected.code}
        </span>
        <ChevronDown className={styles.chevron} aria-hidden />
      </button>

      {open ? (
        <div className={styles.menu} role="listbox">
          {DIAL_CODES.map((entry) => (
            <button
              key={entry.code}
              type="button"
              role="option"
              aria-selected={entry.code === value}
              className={[
                styles.option,
                entry.code === value ? styles.optionSelected : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                onChange(entry.code);
                setOpen(false);
              }}
            >
              <span>{entry.flag}</span>
              <span>{entry.code}</span>
              <span className={styles.country}>{entry.country}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
