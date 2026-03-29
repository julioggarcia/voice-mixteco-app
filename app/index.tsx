import { colors, spacing, typography } from "@/theme";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { MaterialIcons } from "@expo/vector-icons";
import { RecordRow } from "@/components/RecordRow";
import { Pager } from "@/components/Pager";
import type { Record } from "@/components/RecordRow";
import { recordings } from "@/data/mockRecordings";

import { useState, useEffect } from "react";


export default function Dashboard() {
  const [recordingList, setRecordingList] = useState<Record[]>(recordings);
  const [paginatedList, setPaginatedList] = useState<Record[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  //these are the initial
  useEffect(() => {
    updatePage(1, 5);
  }, [])

  async function updatePage(page: number, pageSize: number) {
    const start = (page-1) * pageSize;
    const end = start + pageSize;

    const paginated = recordingList.slice(start, end);

    setPaginatedList(paginated);
    setCurrentPage(page);
  }

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
          { paginatedList.map((r) => (
            <RecordRow key={r.id} recording={r} onPress={() => {}} />
          ))}
        </View>

        <Pager 
          totalItems={ recordings.length } 
          currentPage={ currentPage }
          onChange={updatePage}
        />
          
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
