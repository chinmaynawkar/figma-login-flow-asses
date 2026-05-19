import { AnimatePresence, motion } from "framer-motion";
import { StepLayout } from "@/components/layout/StepLayout";
import { SignupProvider, useSignup } from "@/features/signup/SignupContext";
import {
  AccountTypeStep,
  NameStep,
  OtpStep,
  OtpSuccessStep,
  PasswordStep,
  PhoneStep,
  SuccessStep,
} from "@/features/signup/steps";
import { STEP_TITLES } from "@/lib/constants";
import { pageVariants } from "@/styles/animations";
import { SignupStep } from "@/types/signup";
import styles from "./SignupWizard.module.scss";

function SignupWizardContent() {
  const { state, progress } = useSignup();
  const copy = STEP_TITLES[state.step];

  const renderStep = () => {
    switch (state.step) {
      case SignupStep.AccountType:
        return <AccountTypeStep />;
      case SignupStep.Phone:
        return <PhoneStep />;
      case SignupStep.Otp:
        return <OtpStep />;
      case SignupStep.OtpSuccess:
        return <OtpSuccessStep />;
      case SignupStep.Name:
        return <NameStep />;
      case SignupStep.Password:
        return <PasswordStep />;
      case SignupStep.Success:
        return (
          <>
            <PasswordStep readOnly />
            <SuccessStep />
          </>
        );
      default: {
        const _exhaustive: never = state.step;
        return _exhaustive;
      }
    }
  };

  return (
    <StepLayout
      progress={progress}
      formTitle={copy.title}
      formSubtitle={copy.subtitle}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={state.step}
          className={styles.stepMotion}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </StepLayout>
  );
}

export function SignupWizard() {
  return (
    <SignupProvider>
      <SignupWizardContent />
    </SignupProvider>
  );
}
