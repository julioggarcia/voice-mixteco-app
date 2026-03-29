import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "../theme";

export function MetricCard({ label, value }: {label: string, value: string}) {
  return (
    <View style={styles.card}>
      <Text style={typography.label.overline}>{label}</Text>
      <Text style={typography.headline.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
