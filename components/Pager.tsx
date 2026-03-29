import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";

type PagerProps = {
  totalItems: number,
  currentPage: number,
  onChange: (page: number, pageSize: number) => void,
}


export function Pager(pagerData: PagerProps){
  const pageSize = 5;// items to show on page
  const totalPages = Math.max(1, Math.ceil(pagerData.totalItems / pageSize));
  const onPage = Math.min(Math.max(1, pagerData.currentPage), totalPages);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <View style={styles.row}>
      <Pressable 
        onPress={() => pagerData.onChange(Math.max(1, onPage - 1), pageSize)}
        style={({ pressed }) => [styles.btn, pressed && styles.btnActive]}
      >
        <Text style={styles.btnText}>{'<'}</Text>
      </Pressable>

      {pages.map(p => {
        const active = p === onPage;
        return (
          <Pressable 
            key={p}
            onPress={() => pagerData.onChange(p, pageSize)}
            style={({ pressed }) => [
              styles.btn, 
              active && [styles.btnActive],
              pressed && styles.btnActive,
            ]}
          >
            <Text style={styles.btnText}>{p}</Text>
          </Pressable>
        );
      })}

      <Pressable 
        onPress={() => pagerData.onChange(Math.min(totalPages, onPage+1), pageSize)}
        style={({ pressed }) => [styles.btn, pressed && styles.btnActive]}
      >
        <Text style={styles.btnText}>{'>'}</Text>
      </Pressable>        
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 22,
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { 
    color: colors.black,
    fontWeight: "800",
  },
  btnActive: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.white,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  btnActiveText: {
    color: colors.black,
    fontWeight: "900",
  },
})
