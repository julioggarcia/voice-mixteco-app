import { colors } from "@/theme";
import { Text, View, StyleSheet } from "react-native";
import { Header } from "../components/Header";

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

      <View>
        <View>
          <Text>Total time</Text>
        </View>
        <View>
          <Text>Second view</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg }
});
