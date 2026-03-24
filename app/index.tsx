import { colors, spacing, typography } from "@/theme";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { MaterialIcons } from "@expo/vector-icons";


const sessions: Session[] = [
  {
    id: "1",
    title: "Product Brainstorming",
    dateLabel: "Today, 2:45 PM",
    sizeLabel: "12.4 MB",
    durationLabel: "42:15",
    formatLabel: "WAV • 48kHz",
    iconName: "mic",
    highlighted: true,
  },
  {
    id: "2",
    title: "Lecture: Quantum Physics",
    dateLabel: "Oct 26, 2023",
    sizeLabel: "45.8 MB",
    durationLabel: "1:15:30",
    formatLabel: "MP3 • 320kbps",
    iconName: "description",
  },
  {
    id: "3",
    title: "Acoustic Guitar Hook",
    dateLabel: "Oct 25, 2023",
    sizeLabel: "5.2 MB",
    durationLabel: "0:45",
    formatLabel: "WAV • 96kHz",
    iconName: "music-note",
  },
  {
    id: "4",
    title: "Voice Memo: Grocery List",
    dateLabel: "Oct 24, 2023",
    sizeLabel: "1.1 MB",
    durationLabel: "2:12",
    formatLabel: "M4A • 128kbps",
    iconName: "history-edu",
  },
];

export default function Dashboard() {
  return (
    <View style={styles.safe}>
      <Header />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.metrics}>
          <MetricCard label="Total Time" value="12h 45m"/>
          <MetricCard label="Recordings" value="48"/>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={typography.headline.section}>Recent Sessions</Text>
          <Pressable style={styles.sectionAction} onPress={() => {}}>
            <Text style={typography.label.action}>View Folders</Text>
            <MaterialIcons name="chevron-right" size={18} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.list}>
          { sessions.map((s) => (
            <SessionRow key={s.id} session={s} onPress={() => {}} />
          ))}
        </View>
          
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: 180, //room for bottom nav
  },
  metrics: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  sectionAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  list: {
    gap: spacing.sm,
  },
});
