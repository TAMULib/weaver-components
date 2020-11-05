interface ColorTheme {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
  link: string;
  plain: string;
  outlinePrimary: string;
  outlineSecondary: string;
  outlineSuccess: string;
  outlineDanger: string;
  outlineWarning: string;
  outlineInfo: string;
  outlineLight: string;
  outlineDark: string;
  outlineLink: string;
}

type ThemedColor = keyof ColorTheme;

export {
  ColorTheme,
  ThemedColor
};
