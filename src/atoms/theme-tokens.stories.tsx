import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import styles from "./theme-tokens.module.scss";

interface ColorToken {
  name: string;
  label: string;
  purpose: string;
}

const palette: ColorToken[] = [
  {
    name: "--color-green",
    label: "Brand green",
    purpose: "Primary actions and selected states",
  },
  {
    name: "--color-light-green",
    label: "Mint",
    purpose: "Positive badges and quiet emphasis",
  },
  {
    name: "--color-light-blue",
    label: "Sky",
    purpose: "Informational accents",
  },
  {
    name: "--color-lighter-gray",
    label: "Mist",
    purpose: "Subtle hover and surface states",
  },
  {
    name: "--color-light-gray",
    label: "Cloud",
    purpose: "Selected controls and soft dividers",
  },
  {
    name: "--color-gray",
    label: "Border",
    purpose: "Component outlines and separators",
  },
  {
    name: "--color-gray-dark",
    label: "Slate",
    purpose: "Secondary text with accessible contrast",
  },
  {
    name: "--color-black",
    label: "Ink",
    purpose: "Headings and primary text",
  },
  {
    name: "--color-white",
    label: "Canvas",
    purpose: "Primary surface and inverse text",
  },
];

const semanticTokens = [
  {
    name: "--color-primary",
    alias: "--color-green",
    purpose: "Interactive emphasis",
  },
  {
    name: "--color-primary-hover",
    purpose: "Hovered primary action",
  },
  {
    name: "--color-border",
    alias: "--color-gray",
    purpose: "Default component boundary",
  },
  {
    name: "--text-color",
    alias: "--color-black",
    purpose: "Default foreground",
  },
  {
    name: "--bg-color",
    alias: "--color-white",
    purpose: "Default page surface",
  },
];

const spacingTokens = [
  { name: "--space-1", label: "Compact" },
  { name: "--space-2", label: "Related" },
  { name: "--space-3", label: "Grouped" },
];

function useCssVariable(name: string) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const computedValue = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    setValue(computedValue);
  }, [name]);

  return value;
}

const ColorCard: React.FC<ColorToken> = ({ name, label, purpose }) => {
  const value = useCssVariable(name);

  return (
    <article className={styles.colorCard}>
      <div
        className={styles.colorSwatch}
        style={{ backgroundColor: `var(${name})` }}
        aria-hidden="true"
      >
        <span>{value}</span>
      </div>
      <div className={styles.colorContent}>
        <div>
          <strong>{label}</strong>
          <code>{name}</code>
        </div>
        <p>{purpose}</p>
      </div>
    </article>
  );
};

const SemanticCard: React.FC<{
  name: string;
  alias?: string;
  purpose: string;
}> = ({ name, alias, purpose }) => {
  const value = useCssVariable(name);

  return (
    <article className={styles.semanticCard}>
      <span
        className={styles.semanticSwatch}
        style={{ backgroundColor: `var(${name})` }}
        aria-hidden="true"
      />
      <div className={styles.semanticCopy}>
        <code>{name}</code>
        <p>{purpose}</p>
      </div>
      <div className={styles.semanticValue}>
        {alias && <span>var({alias})</span>}
        <code>{value}</code>
      </div>
    </article>
  );
};

const SpacingRow: React.FC<{ name: string; label: string }> = ({
  name,
  label,
}) => {
  const value = useCssVariable(name);

  return (
    <div className={styles.spacingRow}>
      <div>
        <strong>{label}</strong>
        <code>{name}</code>
      </div>
      <div className={styles.spacingMeasure}>
        <span
          className={styles.spacingBar}
          style={{ width: `calc(var(${name}) * 5)` }}
          aria-hidden="true"
        />
        <code>{value}</code>
      </div>
    </div>
  );
};

const ThemeTokens: React.FC = () => {
  const fontFamily = useCssVariable("--font-sans");
  const fontWeight = useCssVariable("--font-weight-medium");
  const radius = useCssVariable("--radius");
  const focusRing = useCssVariable("--focus-ring");

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Foundations / Design tokens</p>
            <h1>A small visual language with intentional defaults.</h1>
            <p className={styles.lede}>
              These shared decisions keep color, spacing, type, and interaction
              feedback consistent as the system grows from elements into complete
              workflows.
            </p>
            <div className={styles.summary} aria-label="Token summary">
              <span>9 palette colors</span>
              <span>5 semantic roles</span>
              <span>3 spacing steps</span>
            </div>
          </div>
          <div className={styles.heroComposition} aria-hidden="true">
            <span className={styles.heroShapeLarge} />
            <span className={styles.heroShapeMedium} />
            <span className={styles.heroShapeSmall} />
            <span className={styles.heroLine} />
          </div>
        </header>

        <main className={styles.content}>
          <section aria-labelledby="palette-heading">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionNumber}>01</p>
                <h2 id="palette-heading">Core palette</h2>
              </div>
              <p>
                Raw values provide the available range. Components consume semantic
                aliases whenever the color communicates meaning.
              </p>
            </div>
            <div className={styles.paletteGrid}>
              {palette.map((token) => (
                <ColorCard key={token.name} {...token} />
              ))}
            </div>
          </section>

          <section aria-labelledby="semantic-heading">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionNumber}>02</p>
                <h2 id="semantic-heading">Semantic color</h2>
              </div>
              <p>
                Meaningful names create a stable contract between the interface and
                the underlying palette.
              </p>
            </div>
            <div className={styles.semanticList}>
              {semanticTokens.map((token) => (
                <SemanticCard key={token.name} {...token} />
              ))}
            </div>
          </section>

          <section aria-labelledby="type-heading">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionNumber}>03</p>
                <h2 id="type-heading">Typography</h2>
              </div>
              <p>
                A compact sans-serif foundation keeps component labels and dense
                workflows direct and readable.
              </p>
            </div>
            <div className={styles.typeGrid}>
              <article className={styles.typeSpecimen}>
                <div className={styles.specimenMeta}>
                  <span>Typeface</span>
                  <code>--font-sans</code>
                </div>
                <p className={styles.displaySample}>Aa</p>
                <p className={styles.alphabetSample}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  <br />
                  abcdefghijklmnopqrstuvwxyz
                </p>
                <code className={styles.resolvedValue}>{fontFamily}</code>
              </article>
              <article className={styles.weightSpecimen}>
                <div className={styles.specimenMeta}>
                  <span>Emphasis</span>
                  <code>--font-weight-medium</code>
                </div>
                <div className={styles.weightSample}>
                  <span>Clear hierarchy, quietly expressed.</span>
                  <strong>Clear hierarchy, quietly expressed.</strong>
                </div>
                <code className={styles.resolvedValue}>{fontWeight}</code>
              </article>
            </div>
          </section>

          <section aria-labelledby="layout-heading">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionNumber}>04</p>
                <h2 id="layout-heading">Space and shape</h2>
              </div>
              <p>
                A restrained scale keeps related content close and gives composed
                patterns a predictable rhythm.
              </p>
            </div>
            <div className={styles.layoutGrid}>
              <article className={styles.spacingCard}>
                <div className={styles.specimenMeta}>
                  <span>Spacing scale</span>
                  <span>4px base</span>
                </div>
                <div className={styles.spacingList}>
                  {spacingTokens.map((token) => (
                    <SpacingRow key={token.name} {...token} />
                  ))}
                </div>
              </article>
              <div className={styles.detailGrid}>
                <article className={styles.detailCard}>
                  <div className={styles.specimenMeta}>
                    <span>Shape</span>
                    <code>--radius</code>
                  </div>
                  <div
                    className={styles.radiusPreview}
                    aria-label={`Corner radius preview: ${radius}`}
                  >
                    <span>{radius}</span>
                  </div>
                </article>
                <article className={styles.detailCard}>
                  <div className={styles.specimenMeta}>
                    <span>Interaction</span>
                    <code>--focus-ring</code>
                  </div>
                  <div
                    className={styles.focusPreview}
                    aria-label={`Focus ring preview: ${focusRing}`}
                  >
                    Keyboard focus
                  </div>
                </article>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const meta: Meta<typeof ThemeTokens> = {
  title: "Atoms/Tokens",
  component: ThemeTokens,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          "The foundational values that connect the visual language to every component in the system.",
      },
      canvas: { sourceState: "none" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof ThemeTokens>;

export const Primary: Story = {
  render: () => <ThemeTokens />,
};
