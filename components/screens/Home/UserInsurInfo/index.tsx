import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import DocumentIcon from "@/components/icons/document.svg";
import StarIcon from "@/components/icons/star-outline.svg";

import { SvgProps } from "react-native-svg";

interface UserBadgeProps {
  title: string;
  quantity: string;
  unit: string;
  icon: React.FC<SvgProps>;
}

function UserBadge(props: UserBadgeProps) {
  return (
    <View style={styles.badgeInfo}>
      <View style={{ flex: 3 }}>
        <Text style={{fontSize: 16, fontWeight: '600'}}>{props.title}</Text>
        <Text style={{fontSize: 12, fontWeight: '400'}}>
          {props.quantity} {props.unit}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <props.icon fill={"#387EFA"} width={30} height={30} />
      </View>
    </View>
  );
}

export default function UserInsurInfo() {
  return (
    <View style={styles.container}>
      <UserBadge icon={DocumentIcon} title="Hợp đồng" quantity="0" unit="hợp đồng"/>
      <UserBadge icon={StarIcon} title="Sử dụng điểm" quantity="0" unit="điểm"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10, 
  },
  badgeInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    padding: 10,
  },
});
