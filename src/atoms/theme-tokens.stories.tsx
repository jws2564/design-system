import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

type TokenKind = "color" | "font" | "number" | "space";

/** Read a CSS custom property from :root (or documentElement). */
function readCssVar(name: string): string {
  if (typeof window === "undefined") return "";
  const val = getComputedStyle(document.documentElement).getPropertyValue(name);
  return val.trim();
}

/** Swatch for colors */
const ColorRow: React.FC<{ name: string; aliasOf?: string }> = ({
  name,
  aliasOf,
}) => {
  const [val, setVal] = React.useState<string>("");
  React.useEffect(() => setVal(readCssVar(name)), [name]);

  const resolved = aliasOf ? `var(${aliasOf}) → ${readCssVar(aliasOf)}` : val;

  return (
    <tr>
      <td style={{ fontFamily: "monospace", whiteSpace: "nowrap" }}>{name}</td>
      <td>
        <div
          title={val}
          style={{
            width: 32,
            height: 20,
            borderRadius: 4,
            border: "1px solid #ddd",
            background: `var(${name})`,
          }}
        />
      </td>
      <td style={{ fontFamily: "monospace" }}>{resolved || "—"}</td>
    </tr>
  );
};

/** Typography sample */
const FontRow: React.FC<{ name: string; sample?: string }> = ({
  name,
  sample = "The quick brown fox",
}) => {
  const [val, setVal] = React.useState<string>("");
  React.useEffect(() => setVal(readCssVar(name)), [name]);
  return (
    <tr>
      <td style={{ fontFamily: "monospace", whiteSpace: "nowrap" }}>{name}</td>
      <td colSpan={2} style={{ fontFamily: `var(${name})`, padding: "6px 0" }}>
        {sample}{" "}
        <span style={{ opacity: 0.6, marginLeft: 8 }}>(→ {val || "—"})</span>
      </td>
    </tr>
  );
};

/** Numeric/spacing sample */
const SizeRow: React.FC<{ name: string; kind?: TokenKind }> = ({
  name,
  kind = "number",
}) => {
  const [val, setVal] = React.useState<string>("");
  React.useEffect(() => setVal(readCssVar(name)), [name]);
  return (
    <tr>
      <td style={{ fontFamily: "monospace", whiteSpace: "nowrap" }}>{name}</td>
      <td colSpan={2}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {kind === "space" ? (
            <div
              title={val}
              style={{
                height: 20,
                width: `var(${name})`,
                background: "#eee",
                border: "1px solid #ddd",
                borderRadius: 4,
              }}
            />
          ) : (
            <code>{val || "—"}</code>
          )}
        </div>
      </td>
    </tr>
  );
};

/** Main gallery component used by the story and Docs page */
const ThemeTokens: React.FC = () => {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Palette */}
      <section>
        <h3>Palette</h3>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Variable</th>
              <th style={{ textAlign: "left" }}>Preview</th>
              <th style={{ textAlign: "left" }}>Value</th>
            </tr>
          </thead>
          <tbody>
            <ColorRow name="--color-green" />
            <ColorRow name="--color-light-green" />
            <ColorRow name="--color-light-blue" />
            <ColorRow name="--color-lighter-gray" />
            <ColorRow name="--color-light-gray" />
            <ColorRow name="--color-gray" />
            <ColorRow name="--color-gray-dark" />
            <ColorRow name="--color-black" />
            <ColorRow name="--color-white" />
          </tbody>
        </table>
      </section>

      {/* Semantic */}
      <section>
        <h3>Semantic</h3>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Variable</th>
              <th style={{ textAlign: "left" }}>Preview</th>
              <th style={{ textAlign: "left" }}>Value / Alias</th>
            </tr>
          </thead>
          <tbody>
            <ColorRow name="--color-primary" aliasOf="--color-green" />
            <ColorRow name="--color-border" aliasOf="--color-gray" />
            <ColorRow name="--text-color" />
            <ColorRow name="--bg-color" />
          </tbody>
        </table>
      </section>

      {/* Typography */}
      <section>
        <h3>Typography</h3>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Variable</th>
              <th style={{ textAlign: "left" }} colSpan={2}>
                Sample
              </th>
            </tr>
          </thead>
          <tbody>
            <FontRow name="--font-sans" />
            <SizeRow name="--font-weight-medium" />
          </tbody>
        </table>
      </section>
    </div>
  );
};

const meta: Meta<typeof ThemeTokens> = {
  title: "Atoms/Tokens",
  component: ThemeTokens,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: { autodocs: true },
  },
};
export default meta;

type Story = StoryObj<typeof ThemeTokens>;

export const Primary: Story = {
  render: () => <ThemeTokens />,
};
