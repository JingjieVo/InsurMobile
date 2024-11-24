import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

export default function BackButton() {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <AntDesign name="leftcircle" size={30} color="#06BCEE" />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    backButton: {
      
    }
  });
  