import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";

import backgroundImage from "../../assets/images/background.jpg";
import userImage from "../../assets/images/userimage.jpg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import ShieldUserIcon from "@/components/icons/shield-user.svg";
import MotoIcon from "@/components/icons/moto.svg";
import CarIcon from "@/components/icons/car.svg";
import HomeIcon from "@/components/icons/home.svg";
import LuggageIcon from "@/components/icons/luggage.svg";

import IconButton from "@/components/IconButton";
import Home from "@/components/screens/Home";

export default function HomeScreen() {
  return <Home/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 12,
    marginTop: StatusBar.currentHeight,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  insurBadge: {
    backgroundColor: "#EFE7FE",
    borderWidth: 5,
    borderColor: "white",
    margin: 10,
    height: 160,
    borderRadius: 15,
  },
});
