import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ProgressBar, StepHeader } from "@/components/layout/StepHeader";
import { STEP_HEADER_LABEL, STEP_LAYOUT_COPY } from "@/lib/constants";
import backgroundImage from "@/assets/background.png";
import heroImage from "@/assets/illustrations/signup-hero.png";
import styles from "./StepLayout.module.scss";

export interface StepLayoutProps {
  children: ReactNode;
  progress: number;
  formTitle?: string;
  formSubtitle?: string;
  label?: string;
  title?: string;
  subtitle?: string;
}

export function StepLayout({
  children,
  progress,
  formTitle,
  formSubtitle,
  label = STEP_HEADER_LABEL,
  title = STEP_LAYOUT_COPY.title,
  subtitle = STEP_LAYOUT_COPY.subtitle,
}: Readonly<StepLayoutProps>) {
  return (
    <motion.div className={styles.root} layout>
      <img src={backgroundImage} alt="" className={styles.background} />

      <div className={styles.shell}>
        <div className={styles.card}>
          <aside className={styles.leftPanel}>
            <StepHeader
              progress={progress}
              label={label}
              title={title}
              subtitle={subtitle}
            />
            <div className={styles.hero}>
              <img
                src={heroImage}
                alt="Onboarding illustration"
                className={styles.heroImage}
              />
            </div>
          </aside>

          <div className={styles.rightPanel}>
            <ProgressBar progress={progress} />

            <div className={styles.formCard}>
              {formTitle ? (
                <header className={styles.formHeader}>
                  <h2 className={styles.formTitle}>{formTitle}</h2>
                  {formSubtitle ? (
                    <p className={styles.formSubtitle}>{formSubtitle}</p>
                  ) : null}
                </header>
              ) : null}
              <div className={styles.stepContent}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
