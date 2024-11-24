import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import { View, Image, Text, StyleSheet, StatusBar } from "react-native";
import userImage from "@/assets/images/userimage.jpg";

export default function Header() {
  return (
    <View style={styles.headerSection}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image style={styles.userImage} source={userImage} />
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontWeight: "500", fontSize: 16 }}>Welcome</Text>
          <Link style={{ color: "white", fontSize: 20 }} href={"/(tabs)/account"}>
            You can login here!
          </Link>
        </View>
      </View>
      <View>
        <MaterialIcons name="circle-notifications" size={36} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
