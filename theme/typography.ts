import { colors } from "./colors";

export const typography = {
  // Use system fonts by default; later you can swap to Manrope/Plus Jakarta via expo-font.
  headline: {
    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800" as const,
      letterSpacing: -0.5,
    },
    section: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "800" as const,
    },
    cardTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "800" as const,
    },
    metricValue: {
      color: colors.text,
      fontSize: 28,
      fontWeight: "800" as const,
      letterSpacing: -1,
    },
    duration: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "900" as const,
    },
  },

  label: {
    overline: {
      color: colors.textFaint,
      fontSize: 10,
      fontWeight: "800" as const,
      letterSpacing: 2,
      textTransform: "uppercase" as const,
    },
    subOverline: {
      color: colors.textDim,
      fontSize: 10,
      fontWeight: "800" as const,
      textTransform: "uppercase" as const,
    },
    format: {
      color: colors.textMuted,
      fontSize: 9,
      fontWeight: "900" as const,
      letterSpacing: 2,
      textTransform: "uppercase" as const,
    },
    nav: {
      fontSize: 10,
      fontWeight: "900" as const,
      letterSpacing: 2,
      textTransform: "uppercase" as const,
    },
    action: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "800" as const,
      letterSpacing: 2,
      textTransform: "uppercase" as const,
    },
  },
};
