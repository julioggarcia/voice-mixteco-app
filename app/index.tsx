import { colors, spacing, typography } from "@/theme";
import { Text, View, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { MaterialIcons } from "@expo/vector-icons";
import { RecordRow } from "@/components/RecordRow";
import type { Record } from "@/components/RecordRow";
import { recordings } from "@/data/mockRecordings";
import { useRouter } from "expo-router";

import { useState, useEffect } from "react";

const PAGE_SIZE = 10;

export default function Dashboard() {
  const router = useRouter();
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

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    );
  };

  return (
    <View style={styles.safe}>
      <Header />

      <View style={styles.mainContainer}>
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

        <View style={styles.listContainer}>
          <FlatList
            data={paginatedList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <RecordRow recording={item} onPress={() => {}} />
            )}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.listContent}
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </View>

      {/* center Mic button */}
      <View style={styles.fabContainer}>
        <Pressable 
          style={styles.micButton}
          onPress={() => router.push('/record')}
        >
          <MaterialIcons name="mic" size={32} color={colors.white} />
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  mainContainer: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
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
    gap: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 120,
    marginTop: spacing.md,
    marginHorizontal: spacing.xl,
  },
  listContent: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.md,
  },
  loader: {
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  fabContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  micButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FF3830',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4.56,
    elevation: 8,
  },  
});
