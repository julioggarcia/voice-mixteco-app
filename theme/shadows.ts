import { Platform } from "react-native";
import { colors } from "./colors";

export const shadows = {
  glowWhite: Platform.select({
    ios: {
      shadowColor: colors.white,
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 0 },
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),

  fab: Platform.select({
    ios: {
      shadowColor: colors.white,
      shadowOpacity: 0.25,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),
};
