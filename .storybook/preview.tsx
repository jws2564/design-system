import type { Preview } from "@storybook/react-vite";
import { ThemeProvider } from "../src/Theme-Provider.tsx";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          "Introduction",
          "Atoms",
          "Elements",
          "Mixtures",
          "Compounds",
          "Organisms",
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "error",
    },
    backgrounds: {
      default: "Canvas",
      values: [
        { name: "Canvas", value: "#f6f8f7" },
        { name: "White", value: "#ffffff" },
        { name: "Dark", value: "#17211f" },
      ],
    },
    docs: {
      toc: true,
    },
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider as="div" style={{ minHeight: "100%" }}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
