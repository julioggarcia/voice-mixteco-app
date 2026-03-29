import { View, Text, StyleSheet, Pressable} from "react-native";
import { colors, spacing, radius, typography } from "@/theme/index";
import { MaterialIcons } from "@expo/vector-icons";

export function Header() { 
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <View style={styles.logoBox}>
          <MaterialIcons name="graphic-eq" size={22} color={colors.black} />
        </View>
      </View>

      <View style={styles.right}>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="search" size={22} color={colors.white} />
        </Pressable>
        <Pressable style={styles.iconBtn}>
          <MaterialIcons name="person-outline" size={22} color={colors.white} />
        </Pressable>

      </View>
    </View>    
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderHairline,
    backgroundColor: colors.headerBg,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
  },
  logoBox: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  sub: {
    marginTop: spacing.xxs,
    color: colors.textDim,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.iconBtnBg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    overflow: "hidden",
    marginLeft: spacing.xs,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
});
