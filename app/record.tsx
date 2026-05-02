import { colors, spacing, typography } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";

export default function RecordScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color={colors.white}/>
        </Pressable>

        <Text style={typography.headline.section}>New Recording</Text>
        <View style={{ width: 28 }} /> {/*spacer for centering */}
      </View>

      <View style={styles.content}>
        <View style={styles.waveformContainer}>
          <Text style={{ color: colors.white, opacity: 0.5 }}>Waveform visualization here...</Text>
        </View>

        <Text style={styles.timer}>00:00:00</Text>

        <View style={styles.controls}>
          <Pressable style={styles.mainMicButton}>
            <MaterialIcons name="mic" size={48} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
  },
  header: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformContainer: {
    height: 150,
    width: '100%',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  timer: {
    fontSize: 64,
    fontWeight: '300',
    color: colors.white,
    fontVariant: ['tabular-nums'],
    marginBottom: 60,
  },
  controls: {
    alignItems: 'center',
  },
  mainMicButton: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

