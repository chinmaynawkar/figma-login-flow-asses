import { CircleCheck } from "lucide-react";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useSignup } from "@/features/signup/SignupContext";
import { PLACEHOLDER_EMAIL } from "@/lib/constants";
import styles from "./step.module.scss";

function formatToday(): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

export function SuccessStep() {
  const titleId = useId();
  const { state } = useSignup();
  const navigate = useNavigate();

  const fullName = `${state.firstName} ${state.lastName}`.trim();
  const mobile = `${state.dialCode} ${state.phone}`;

  const handleDashboard = () => {
    navigate("/");
  };

  return (
    <Modal isOpen onClose={handleDashboard} ariaLabelledBy={titleId}>
      <div className={styles.modalBody}>
        <CircleCheck className={styles.modalIcon} strokeWidth={1.5} aria-hidden />
        <h2 id={titleId} className={styles.modalHeading}>
          You&apos;re all set!
        </h2>
        <p className={styles.modalSubheading}>
          Here&apos;s a quick summary of your account details
        </p>

        <div className={styles.summary}>
          <div className={styles.summaryTable}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Account Type</span>
              <span className={styles.summaryValue}>
                {state.accountType
                  ? state.accountType.charAt(0).toUpperCase() +
                    state.accountType.slice(1)
                  : "—"}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Email</span>
              <span className={styles.summaryValue}>{PLACEHOLDER_EMAIL}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Name</span>
              <span className={styles.summaryValue}>{fullName}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Date</span>
              <span className={styles.summaryValue}>{formatToday()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Mobile Number</span>
              <span className={styles.summaryValue}>{mobile}</span>
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          fullWidth
          onClick={handleDashboard}
        >
          Go to Dashboard
        </Button>
      </div>
    </Modal>
  );
}
