import { voiceboxFontStacks, voiceboxTokens } from "../design-system/tokens";

export const tailwindTokens = {
  colors: {
    primary: voiceboxTokens.color.primary,
    accent: voiceboxTokens.color.accent,
    background: voiceboxTokens.color.background,
    surface: voiceboxTokens.color.surface,
    "surface-raised": voiceboxTokens.color.surfaceRaised,
    "text-primary": voiceboxTokens.color.textPrimary,
    "text-secondary": voiceboxTokens.color.textSecondary,
    "text-tertiary": voiceboxTokens.color.textTertiary,
    "border-subtle": voiceboxTokens.color.borderSubtle,
    "border-medium": voiceboxTokens.color.borderMedium,
    "border-strong": voiceboxTokens.color.borderStrong,
    success: voiceboxTokens.color.success,
    warning: voiceboxTokens.color.warning,
    error: voiceboxTokens.color.error,
    info: voiceboxTokens.color.info,
  },
  fontFamily: {
    display: [...voiceboxFontStacks.display],
    sans: [...voiceboxFontStacks.body],
    mono: [...voiceboxFontStacks.mono],
  },
  borderRadius: {
    none: "0",
    sm: "0",
    DEFAULT: "0",
    md: "0",
    lg: "0",
    xl: "0",
    full: "9999px",
  },
  boxShadow: {
    none: "none",
  },
  spacing: {
    18: "4.5rem",
    26: "6.5rem",
    30: "7.5rem",
  },
};
