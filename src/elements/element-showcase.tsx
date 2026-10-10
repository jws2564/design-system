import type { ReactNode } from "react";
import styles from "./element-showcase.module.scss";

type ShowcaseFact = {
  label: string;
  value: string;
};

type ElementShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  facts: ShowcaseFact[];
  children: ReactNode;
  marker?: string;
};

export const ElementShowcase = ({
  eyebrow,
  title,
  description,
  facts,
  children,
  marker = "E",
}: ElementShowcaseProps) => (
  <main className={styles.showcase}>
    <header className={styles.header}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      <span className={styles.marker} aria-hidden="true">
        {marker}
      </span>
    </header>

    <section className={styles.preview} aria-label={`${title} specimen`}>
      {children}
    </section>

    <dl className={styles.facts}>
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  </main>
);
