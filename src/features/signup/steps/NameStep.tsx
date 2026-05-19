import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input";
import { useSignup } from "@/features/signup/SignupContext";
import { StepNavigation } from "@/features/signup/components/StepNavigation";
import { errorsToMap } from "@/features/signup/steps/stepUtils";
import { validateName } from "@/lib/validators";
import styles from "./step.module.scss";

export function NameStep() {
  const { state, dispatch } = useSignup();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  const handleContinue = () => {
    const result = validateName(firstName, lastName);
    if (!result.valid) {
      setErrors(errorsToMap(result.errors));
      return;
    }

    dispatch({
      type: "SET_NAME",
      payload: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
    });
    dispatch({ type: "NEXT_STEP" });
  };

  const canContinue =
    firstName.trim().length >= 2 && lastName.trim().length >= 2;

  return (
    <section className={styles.step} aria-label="Name step">
      <div className={styles.stack}>
        <Input
          ref={firstNameRef}
          label="First Name"
          required
          placeholder="First"
          value={firstName}
          onChange={(event) => {
            setErrors((current) => ({ ...current, firstName: null }));
            setFirstName(event.target.value);
          }}
          error={errors.firstName ?? null}
        />
        <Input
          label="Last Name"
          required
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => {
            setErrors((current) => ({ ...current, lastName: null }));
            setLastName(event.target.value);
          }}
          error={errors.lastName ?? null}
        />
      </div>

      <StepNavigation
        onBack={() => dispatch({ type: "PREV_STEP" })}
        onContinue={handleContinue}
        continueDisabled={!canContinue}
      />
    </section>
  );
}
