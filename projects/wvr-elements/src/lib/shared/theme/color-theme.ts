interface ThemeVariant {
  baseColor: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  shadowColor?: string;
  hoverColor?: string;
  focusColor?: string;
  activeColor?: string;
}

interface ThemeVariants {
  primary: ThemeVariant;
  secondary: ThemeVariant;
  success: ThemeVariant;
  danger: ThemeVariant;
  warning: ThemeVariant;
  info: ThemeVariant;
  light: ThemeVariant;
  dark: ThemeVariant;
  link: ThemeVariant;
  plain: ThemeVariant;
  outlinePrimary: ThemeVariant;
  outlineSecondary: ThemeVariant;
  outlineSuccess: ThemeVariant;
  outlineDanger: ThemeVariant;
  outlineWarning: ThemeVariant;
  outlineInfo: ThemeVariant;
  outlineLight: ThemeVariant;
  outlineDark: ThemeVariant;
  outlineLink: ThemeVariant;
  tamuTan: ThemeVariant;
}

type ThemeVariantName = keyof ThemeVariants;

export {
  ThemeVariants,
  ThemeVariantName
};
