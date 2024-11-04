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

