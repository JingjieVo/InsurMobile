import Icon from "@expo/vector-icons/AntDesign";

import { Link } from "expo-router";
import { View, Image, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { homeStyles } from "..";
import guestAvatar from "@/assets/images/guest_avatar.png";

interface HeaderProps {
  isLogin : boolean;
  user: UserData;
}

export default function Header(props: HeaderProps) {
  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.userInfo}>
        <Image source={guestAvatar} style={homeStyles.avatar} />
        <View style={homeStyles.userTexts}>
          <Text style={homeStyles.userName}>
            {props.isLogin ? props.user?.fullName : "Khách"}
          </Text>
          {props.isLogin ? (
            <Text style={homeStyles.userPoints}>Xu thành viên: 0 điểm</Text>
          ) : (
            <Link href={"/login"}>Đăng nhập tại đây!</Link>
          )}
        </View>
      </View>
      <View style={homeStyles.headerIcons}>
        <TouchableOpacity style={homeStyles.iconButton}>
          <Icon name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={homeStyles.iconButton}>
          <Icon name="notification" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
