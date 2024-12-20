import { Tabs } from "expo-router";
import React from "react";
import { BlurView } from "expo-blur";
import Foundation from "@expo/vector-icons/Foundation";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, StyleSheet, View } from "react-native";
import { TabsBarHeight } from "@/constants/Height";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, focused }) => (
            <Foundation
              name={"home"}
              size={20}
              color={focused ? "#065DF9" : "gray"}
            />
            // <TabBarIcon
            //   name={focused ? "home" : "home-outline"}
            //   color={focused ? "#065DF9" : "gray"}
            // />
          ),
          // Sử dụng `tabBarLabel` để tùy chỉnh title
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                {
                  color: focused ? "#065DF9" : "gray", // Màu sắc thay đổi dựa vào trạng thái
                  fontSize: 14, // Kích thước font chữ
                  fontWeight: "bold", // Độ dày font chữ
                },
              ]}
            >
              Trang chủ
            </Text>
          ),
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: "Tin tức",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "newspaper" : "newspaper-outline"}
              color={focused ? "#065DF9" : "gray"}
            />
          ),
          // Sử dụng `tabBarLabel` để tùy chỉnh title
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#065DF9" : "gray", // Màu sắc thay đổi dựa vào trạng thái
                fontSize: 14, // Kích thước font chữ
                fontWeight: "bold", // Độ dày font chữ
              }}
            >
              Tin tức
            </Text>
          ),
        }}
      /> */}
      <Tabs.Screen
        name="account"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color, focused }) => (
            <Foundation
              name={"torso"}
              size={20}
              color={focused ? "#065DF9" : "gray"}
            />
            // <TabBarIcon
            //   name={focused ? "accessibility" : "accessibility-outline"}
            //   color={focused ? "#065DF9" : "gray"}
            //   style={{}}
            // />
          ),
          // Sử dụng `tabBarLabel` để tùy chỉnh title
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color: focused ? "#065DF9" : "gray", // Màu sắc thay đổi dựa vào trạng thái
                fontSize: 14, // Kích thước font chữ
                fontWeight: "bold", // Độ dày font chữ
              }}
            >
              Tài khoản
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    // backgroundColor: "transparent",
    height: TabsBarHeight,

    paddingBottom: 10, // Cách đều nội dung
    paddingTop: 10,
    // marginHorizontal: 10,
  },
});
