import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

interface ScreenHeaderProps {
    title: string
}

export default function ScreenHeader(props : ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome name="chevron-left" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{props.title}</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="time" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 16,
  },
});
