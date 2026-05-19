import { Button } from "@/components/ui/Button";
import styles from "./StepNavigation.module.scss";

export interface StepNavigationProps {
  onBack?: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLoading?: boolean;
  showBack?: boolean;
  continueLabel?: string;
}

export function StepNavigation({
  onBack,
  onContinue,
  continueDisabled = false,
  continueLoading = false,
  showBack = true,
  continueLabel = "Continue",
}: Readonly<StepNavigationProps>) {
  return (
    <div className={styles.nav}>
      {showBack ? (
        <Button
          type="button"
          variant="ghost"
          disabled={!onBack}
          onClick={onBack}
          className={styles.button}
        >
          Back
        </Button>
      ) : null}
      <Button
        type="button"
        variant="primary"
        loading={continueLoading}
        disabled={continueDisabled}
        onClick={onContinue}
        className={styles.button}
      >
        {continueLabel}
      </Button>
    </div>
  );
}
