import IconButton from "@/components/IconButton";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import ShieldUserIcon from "@/components/icons/shield-user.svg";
import MotoIcon from "@/components/icons/moto.svg";
import CarIcon from "@/components/icons/car.svg";
import HomeIcon from "@/components/icons/home.svg";
import LuggageIcon from "@/components/icons/luggage.svg";

export default function insurOption() {
  return (
    <View style={{ flexDirection: "row", marginVertical: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <IconButton icon={ShieldUserIcon} buttonName="Sức khỏe" isActived />
        <IconButton icon={MotoIcon} buttonName="Xe máy" />
        <IconButton icon={CarIcon} buttonName="Ô tô" />
        <IconButton icon={HomeIcon} buttonName="Nhà ở" />
        <IconButton icon={LuggageIcon} buttonName="Du lịch" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    
});
