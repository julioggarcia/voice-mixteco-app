import React from "react";
import { colors } from "@/theme";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type Record = {
  id: string;
  title: string;
  dateLabel: string;
  sizeLabel: string;
  durationLabel: string;
  formatLabel: string;
  iconName: keyof typeof MaterialIcons.glyphMap;
  highlighted?: boolean;
};

export function RecordRow({
  recording,
  onPress,
}: { recording: Record, onPress?: () => void}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        recording.highlighted && styles.cardHighlighted, pressed && { opacity: 0.92 },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={[styles.iconBox, recording.highlighted && styles.iconBoxHighlighted]}>
            <MaterialIcons 
               name={recording.iconName}
              size={24}
              color={recording.highlighted ? colors.black : "rgba(255, 255, 255, 0.7)"}
            />
          </View>

          <View style={{flex: 1, minWidth: 0 }}>
            <Text style={styles.title}>{recording.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.meta}>{recording.dateLabel}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.meta}>{recording.sizeLabel}</Text>
            </View>
          </View>

          <View style={styles.right}>
            <Text style={styles.duration}>{recording.durationLabel}</Text>
            <Text style={styles.format}>{recording.formatLabel}</Text>
          </View>
        </View>
        {recording.highlighted ? <View pointerEvents="none" style={styles.leftAccent} /> : null }
      </View>
  </Pressable>
  );
}



const styles = StyleSheet.create({
  card: {
    position: "relative",
    padding: 16,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHighlighted: {
    backgroundColor: colors.cardStrong,
    borderColor: colors.borderStrong,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxHighlighted: {
    backgroundColor: colors.white,
    shadowColor: colors.white,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  meta: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  dot: {
    color: colors.dot,
    fontSize: 10,
    fontWeight: "800",
  },
  duration: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900",
  },
  format: {
    marginTop: 4,
    color: "rgba(255,255,255,0.70)",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  leftAccent: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.white,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
});
  

