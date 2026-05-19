import { CheckCircle2, type LucideIcon } from "lucide-react";
import type { AccountType } from "@/types/signup";
import styles from "./AccountTypeCard.module.scss";

export interface AccountTypeCardProps {
  type: AccountType;
  label: string;
  icon: LucideIcon;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function AccountTypeCard({
  label,
  icon: Icon,
  selected,
  onSelect,
  disabled = false,
}: Readonly<AccountTypeCardProps>) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onSelect}
      className={[styles.card, selected ? styles.selected : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon
        className={[styles.icon, selected ? styles.iconSelected : ""]
          .filter(Boolean)
          .join(" ")}
        aria-hidden
      />
      <span
        className={[styles.label, selected ? styles.labelSelected : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </span>
      {selected ? (
        <CheckCircle2 className={styles.badge} size={16} aria-hidden />
      ) : null}
    </button>
  );
}
