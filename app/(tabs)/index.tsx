import { View, Text, StyleSheet, ImageBackground, Image, StatusBar } from "react-native";

import backgroundImage from "../../assets/images/background.jpg";
import userImage from "../../assets/images/userimage.jpg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.image}
    >
      <BlurView intensity={120} style={styles.container}>
        <View style={styles.headerSection}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
            <Image style={styles.userImage} source={userImage} />
            <View>
              <Text>Welcome</Text>
              <Link href={"/(tabs)/account"}>You can login here!</Link>
            </View>
          </View>
          <View>
            <MaterialIcons
              name="circle-notifications"
              size={36}
              color="black"
            />
          </View>
        </View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: StatusBar.currentHeight,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  userImage: {
    width: 50,
    height: 50,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
