import { globalStyles } from "@/components/style/GlobalStyle";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from "expo-blur";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
interface BottomBuyInsurProps {
  price: string;
}

export default function BottomBuyInsur(props: BottomBuyInsurProps) {
  return (
    <BlurView tint="light" intensity={90} style={globalStyles.bottomBuyInsur}>
      <View style={globalStyles.bottomBuyInsurContent}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Phí bảo hiểm:</Text>
          <Text style={{ fontSize: 24, fontWeight: "700" }}>
            {props.price} VND
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 10  }}>
          <View
            style={{
              width: "50%",
              flexDirection: "row",
              backgroundColor: "#F2F6FF",
              justifyContent: "center",
              alignItems: 'center',
              borderRadius: 20,
              gap: 5

            }}
          >
            <View style={{padding: 10}}>
              <Text style={{fontSize: 16}}>Thời hạn bảo hiểm</Text>
              <Text style={{fontSize: 20, fontWeight: '600'}}>1 Năm</Text>
            </View>
            <AntDesign name="down" size={24} color="black" />
          </View>
          <TouchableOpacity
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FA7BBC",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
}
