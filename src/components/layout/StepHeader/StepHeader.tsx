import { motion } from "framer-motion";
import styles from "./StepHeader.module.scss";

export interface StepHeaderProps {
  progress: number;
  label: string;
  title: string;
  subtitle?: string;
  showProgress?: boolean;
}

export function ProgressBar({ progress }: Readonly<{ progress: number }>) {
  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressTrack}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function StepHeader({
  progress,
  label,
  title,
  subtitle,
  showProgress = false,
}: Readonly<StepHeaderProps>) {
  return (
    <header className={styles.header}>
      {showProgress ? <ProgressBar progress={progress} /> : null}
      <p className={styles.label}>{label}</p>
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </header>
  );
}
