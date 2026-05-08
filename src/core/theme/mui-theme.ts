import { createTheme, type Shadows } from "@mui/material/styles";
import { voiceboxTokens } from "@/core/design-system/tokens";

const flatShadows = Array.from({ length: 25 }, () => "none") as Shadows;
const focusRing = voiceboxTokens.focus.ring;

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: voiceboxTokens.color.primary,
      contrastText: voiceboxTokens.color.background,
    },
    secondary: {
      main: voiceboxTokens.color.accent,
      contrastText: voiceboxTokens.color.background,
    },
    background: {
      default: voiceboxTokens.color.background,
      paper: voiceboxTokens.color.surface,
    },
    text: {
      primary: voiceboxTokens.color.textPrimary,
      secondary: voiceboxTokens.color.textSecondary,
    },
    error: {
      main: voiceboxTokens.color.error,
    },
    success: {
      main: voiceboxTokens.color.success,
    },
    warning: {
      main: voiceboxTokens.color.warning,
    },
    info: {
      main: voiceboxTokens.color.info,
    },
  },
  shape: {
    borderRadius: 0,
  },
  shadows: flatShadows,
  typography: {
    fontFamily: voiceboxTokens.typography.fontFamily.body,
    h1: {
      fontFamily: voiceboxTokens.typography.fontFamily.display,
      fontWeight: 400,
      letterSpacing: 0,
      textTransform: "uppercase",
    },
    h2: {
      fontFamily: voiceboxTokens.typography.fontFamily.display,
      fontWeight: 400,
      letterSpacing: 0,
      textTransform: "uppercase",
    },
    button: {
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          borderWidth: 2,
          boxShadow: "none",
          fontWeight: 700,
          textTransform: "uppercase",
          "&:hover": {
            boxShadow: "none",
          },
          "&:focus-visible": {
            boxShadow: focusRing,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: voiceboxTokens.color.background,
          color: voiceboxTokens.color.textPrimary,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: voiceboxTokens.color.borderStrong,
            borderWidth: 2,
          },
          "&:focus-within": {
            boxShadow: focusRing,
          },
        },
        notchedOutline: {
          borderColor: voiceboxTokens.color.borderMedium,
          borderWidth: 2,
        },
      },
    },
  },
});
