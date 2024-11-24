import React from "react";
import ShieldUserIcon from "@/components/icons/shield-user.svg";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";

interface IconButtonProps {
  icon: React.FC<SvgProps>;
  isActived?: boolean;
  buttonName: string;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 25,
          backgroundColor: props.isActived ? "#074DC9" : "#FEFEFE",
          marginHorizontal: 10,
        }}
      >
        <props.icon
          width={40}
          height={40}
          fill={props.isActived ? "white" : "gray"}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.text,
          { color: props.isActived ? "#074DC9" : "#FEFEFE" },
        ]}
      >
        {props.buttonName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 6,
  },
  text: { fontWeight: "700", fontSize: 12 },
});
