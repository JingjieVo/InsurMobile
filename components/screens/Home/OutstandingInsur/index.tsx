import { Link } from "expo-router";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShieldUserIcon from "@/components/icons/shield-user.svg";
import { TabsBarHeight } from "@/constants/Height";

function InsurCard() {
  return (
    <View style={styles.insurCard}>
      <ShieldUserIcon width={40} height={40} fill={"#A0C0FC"} />
      <Text
        style={{
          color: "gray",
          fontWeight: "600",
        }}
      >
        Bạn chưa có thẻ bảo hiểm
      </Text>
    </View>
  );
}

export default function OutstandingInsur() {
  return (
    <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            Sản phẩm nổi bật
          </Text>
          <Link
            style={{ textDecorationLine: "underline", color: "#387EFA" }}
            href={"/"}
          >
            Xem tất cả
          </Link>
        </View>
        <View>
            <InsurCard/>
            <InsurCard/>
            <InsurCard/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    paddingBottom: TabsBarHeight + 5,

  },
  insurCard: {
    backgroundColor: "#EFE7FE",
    borderWidth: 5,
    borderColor: "white",
    margin: 10,
    minHeight: 160,
    maxHeight: 170,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
