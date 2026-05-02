import { colors, spacing, typography } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet, View, Text, TextInput, Platform, BackHandler } from "react-native";
import { useRouter} from "expo-router";
import { useState, useEffect, useRef } from "react";

type RecordingState = "idle" | "recording" | "paused" | "editing";

export default function RecordScreen() {
  const router = useRouter();
  const [state, setState] = useState<RecordingState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [recordingName, setRecordingName] = useState("New Recording");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state == "recording") {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev+1);
      }, 1000); //every 1 sec
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => { 
      if (timerRef.current) 
        clearInterval(timerRef.current); 
    };
  }, [state]);

  const formatTime = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const min = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  };

  //android button back pressed
  useEffect(() => {
    const backAction = () => {
      if (state !== "idle") {
        handleBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [state]);

  const handleBack = () => {
    if (state !== "idle") {
      if (Platform.OS === 'web') {
        const confirmed = window.confirm("Discard recording? You will your progress.");
        if (confirmed) router.back();
      } else {
        Alert.alert(
          "Discard Recording?",
          "Are you sure? You will lose your current progress.",
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Discard', style: 'destructive', onPress: () => router.back() },
          ]
        );
      }
    } else router.back();
  };

  const handleMainButton = () => {
    if (state == "idle" || state === "paused") setState("recording");
    else if (state === "recording") setState("editing");
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={28} color={colors.white}/>
        </Pressable>

        {state === "editing" ? (
          <TextInput 
            style={[typography.headline.section, styles.titleInput]}
            value={recordingName}
            onChangeText={setRecordingName}
            autoFocus
            selectTextOnFocus
          />
        ) : (
            <Text style={typography.headline.section}>{recordingName}</Text>
        )}

        <Pressable onPress={() => state === "editing" && router.back()}>
          <Text style={[typography.label.action, { opacity: state === "editing" ? 1 : 0 }]}>Save</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {/* Visualizer / Cropper Area */}
        <View style={[styles.waveformContainer, state === "editing" && styles.waveformEditing]}>
          <Text style={{ color: colors.white, opacity: 0.5 }}>
            {state === "editing" ? "<> Drag edges to crop" : "Waveform visualization..."}
          </Text>
          {state === "editing" && <View style={styles.cropOverlay} />}
        </View>

        <Text style={styles.timer}>{formatTime(seconds)}</Text>

        {/* controls */}
        <View style={styles.controlsRow}>
          {/* Pause button - only visible when recording/paused */}
          {(state === "recording" || state === "paused") && (
            <Pressable 
              style={styles.secondaryButton}
              onPress={() => setState(state === "recording" ? "paused" : "recording")}
            >
              <MaterialIcons 
                name={state === "recording" ? "pause" : "play-arrow"}
                size={32} 
                color={colors.white} 
              />
            </Pressable>
          )}

          {/* Main Record/Stop button */}
          {state !== "editing" && (
            <Pressable style={styles.mainButton} onPress={handleMainButton}>
              <View style={state === "recording" ? styles.stopSquare : null}>
                {state !== "recording" && (
                  <MaterialIcons name="mic" size={48} color={colors.white} />
                )}
              </View>
            </Pressable>
          )}

          {/* Discoard reset - only visible in Editing */}
          {state === "editing" && (
            <Pressable style={styles.textButton} onPress={() => { setState("idle"); setSeconds(0); }}>
              <Text style={{ color: '#FF3B30', fontSize: 16, fontWeight: '600' }}>Discard</Text>
            </Pressable>
          )}
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
  titleInput: {
    color: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    paddingHorizontal: 8,
    textAlign: 'center',
    minWidth: 150,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformContainer: {
    height: 180,
    width: '100%',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  waveformEditing: {
    borderWidth: 2,
    borderColor: '#FFD60A',
  },
  cropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 214, 10, 0.1)',
    marginHorizontal: 40,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFD60A',
  },
  timer: {
    fontSize: 64,
    fontWeight: '300',
    color: colors.white,
    fontVariant: ['tabular-nums'],
    marginBottom: 60,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    height: 100,
  },
  mainButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopSquare: {
    width: 32,
    height: 32,
    borderRadius: 4, 
    backgroundColor: colors.white,
  },
  secondaryButton: {
    width: 64,
    height: 64, 
    borderRadius: 32,
    backgroundColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    padding: 12,
  },
});

