import { BlurView } from "expo-blur";
import React from "react";
import { ImageBackground, StatusBar, StyleSheet } from "react-native";
import backgroundImage from "@/assets/images/background.jpg";

export default function ScreenContainer({children}: {children : React.ReactNode}) {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.image}
    >
      <BlurView intensity={120} tint="light" style={styles.container}>
        {children}
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
