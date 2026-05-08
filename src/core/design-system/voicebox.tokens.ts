export const voiceboxFontStacks = {
  display: ['"Archivo Black"', "Impact", '"Arial Black"', "sans-serif"],
  body: [
    '"Work Sans"',
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  mono: ['"Space Mono"', '"Courier New"', "Consolas", "monospace"],
} as const;

export const voiceboxTokens = {
  color: {
    primary: "#0A0A0A",
    accent: "#EF4444",
    background: "#FAFAFA",
    surface: "#F5F5F5",
    surfaceRaised: "#E5E5E5",
    textPrimary: "#0A0A0A",
    textSecondary: "#525252",
    textTertiary: "#A3A3A3",
    borderSubtle: "#E5E5E5",
    borderMedium: "#D4D4D4",
    borderStrong: "#0A0A0A",
    success: "#16A34A",
    warning: "#CA8A04",
    error: "#EF4444",
    info: "#0A0A0A",
  },
  typography: {
    fontFamily: {
      display: voiceboxFontStacks.display.join(", "),
      body: voiceboxFontStacks.body.join(", "),
      mono: voiceboxFontStacks.mono.join(", "),
    },
    size: {
      display: "3.5rem",
      headline: "2.375rem",
      subhead: "1.5rem",
      bodyLarge: "1.25rem",
      body: "1rem",
      bodySmall: "0.875rem",
      caption: "0.75rem",
      overline: "0.6875rem",
      code: "0.875rem",
    },
    lineHeight: {
      display: "1.05",
      headline: "1.1",
      subhead: "1.2",
      bodyLarge: "1.65",
      body: "1.7",
      bodySmall: "1.6",
      caption: "1.5",
      overline: "1.4",
      code: "1.6",
    },
    letterSpacing: {
      none: "0",
      button: "0.06em",
      overline: "0.12em",
    },
  },
  spacing: {
    unit: "0.5rem",
    sectionMobile: "3rem",
    sectionTablet: "4rem",
    sectionDesktop: "6rem",
  },
  radius: {
    none: "0",
    full: "9999px",
  },
  border: {
    interactive: "2px solid #0A0A0A",
    accentUnderline: "3px solid #EF4444",
  },
  shadow: {
    none: "none",
  },
  focus: {
    ring: "0 0 0 2px #FAFAFA, 0 0 0 4px #0A0A0A",
  },
  motion: {
    revealDuration: 0.35,
    revealEase: [0.16, 1, 0.3, 1],
  },
} as const;
