import { BlurView } from "expo-blur";
import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import BackButton from "../BackButton";

interface ScreenHeaderProps {
  screenTitle: string;
}

export default function ScreenHeader(props: ScreenHeaderProps) {
  return (
    <BlurView intensity={120} tint="light" style={styles.header}>
      <Text style={styles.headerTitle}>{props.screenTitle}</Text>
      <View style={styles.backButton}>
        <BackButton />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "static",
    height: 68,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  backButton: {
    position: "absolute",
    left: 18,
  },
});
