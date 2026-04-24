import { colors, spacing, typography } from "@/theme";
import { Text, View, StyleSheet, ScrollView, Pressable, FlatList, ActivityIndicator } from "react-native";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { MaterialIcons } from "@expo/vector-icons";
import { RecordRow } from "@/components/RecordRow";
import type { Record } from "@/components/RecordRow";
import { recordings } from "@/data/mockRecordings";

import { useState, useEffect } from "react";

const PAGE_SIZE = 10;

export default function Dashboard() {
  const [paginatedList, setPaginatedList] = useState<Record[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading ] = useState(false);

  //these are the initial
  useEffect(() => {
    loadInitialData();
  }, [])

  const loadInitialData = () => {
    const initialData = recordings.slice(0, PAGE_SIZE);
    setPaginatedList(initialData);
  };

  const loadMore = () => {
    if (isLoading || paginatedList.length >= recordings.length) return; //nothing else

    setIsLoading(true);
    //fetch next data - simulate network request delay
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const start = (nextPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const newItems = recordings.slice(start, end);

      setPaginatedList(prev => [...prev, ...newItems]);
      setCurrentPage(nextPage);
      setIsLoading(false);
    }, 500);
  };

  const renderHeader = () => (
    <View style={styles.listHeader}>
      <View style={styles.metrics}>
        <MetricCard label="Total Time" value="12h 45m"/>
        <MetricCard label="Recordings" value={String(recordings.length)}/>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={typography.headline.section}>Recent Sessions</Text>
        <Pressable style={styles.sectionAction} onPress={() => {}}>
          <Text style={typography.label.action}>View Folders</Text>
          <MaterialIcons name="chevron-right" size={18} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!isLoading) return <View style={{height: 100}} />
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    );
  };

  return (
    <View style={styles.safe}>
      <Header />

      <FlatList
        data={paginatedList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <RecordRow recording={item} onPress={() => {}} />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.content}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
      />
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
  listHeader: {
    marginBottom: spacing.sm,
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
  loader: {
    paddingVertical: spacing.md,
    alignItems: "center",
    marginBottom: 100,
  },
});
