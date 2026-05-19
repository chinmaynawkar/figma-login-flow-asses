import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSignup } from "@/features/signup/SignupContext";
import styles from "./step.module.scss";

const AUTO_ADVANCE_MS = 1500;

function CheckmarkIcon() {
  return (
    <svg
      className={styles.checkIcon}
      viewBox="0 0 52 52"
      aria-hidden
    >
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 27l8 8 16-18"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
      />
    </svg>
  );
}

export function OtpSuccessStep() {
  const { dispatch } = useSignup();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      dispatch({ type: "NEXT_STEP" });
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [dispatch]);

  return (
    <section className={styles.success} aria-live="polite">
      <CheckmarkIcon />
      <h2 className={styles.successTitle}>Phone verified!</h2>
    </section>
  );
}
