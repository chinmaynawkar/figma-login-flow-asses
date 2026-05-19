import { Briefcase, User } from "lucide-react";
import { useState } from "react";
import { AccountTypeCard } from "@/components/shared/AccountTypeCard";
import { useSignup } from "@/features/signup/SignupContext";
import { StepNavigation } from "@/features/signup/components/StepNavigation";
import type { AccountType } from "@/types/signup";
import styles from "./step.module.scss";

export function AccountTypeStep() {
  const { dispatch } = useSignup();
  const [selection, setSelection] = useState<AccountType>("personal");

  const handleContinue = () => {
    dispatch({ type: "SET_ACCOUNT_TYPE", payload: selection });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <section className={styles.step} aria-label="Account type step">
      <div className={styles.cardList}>
        <AccountTypeCard
          type="personal"
          label="Personal"
          icon={User}
          selected={selection === "personal"}
          onSelect={() => setSelection("personal")}
        />
        <AccountTypeCard
          type="business"
          label="Business"
          icon={Briefcase}
          selected={selection === "business"}
          onSelect={() => setSelection("business")}
        />
      </div>

      <StepNavigation showBack={false} onContinue={handleContinue} />
    </section>
  );
}
