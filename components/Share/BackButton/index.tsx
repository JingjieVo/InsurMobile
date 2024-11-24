import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";


interface BackButtonProps {
  fill: string;
}
export default function BackButton(props : BackButtonProps) {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <AntDesign name="leftcircle" size={50} color={props.fill} />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
    backButton: {
      
    }
  });
  