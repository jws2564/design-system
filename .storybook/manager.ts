import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Composable UI",
    brandUrl: "./",
    brandTarget: "_self",
    colorPrimary: "#006f5d",
    colorSecondary: "#00866e",
    appBg: "#f4f7f6",
    appContentBg: "#ffffff",
    appBorderColor: "#dbe3e0",
    appBorderRadius: 8,
    textColor: "#17211f",
    textMutedColor: "#66736f",
    barTextColor: "#52605c",
    barSelectedColor: "#006f5d",
    inputBg: "#ffffff",
    inputBorder: "#cbd6d2",
    inputTextColor: "#17211f",
    inputBorderRadius: 6,
  }),
});
