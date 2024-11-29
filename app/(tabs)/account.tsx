import AccountScreen from "@/components/screens/Account";
import UnauthAccountScreen from "@/components/screens/UnauthAccount";
import { getUserToken } from "@/services/authService";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function account() {
  const [isLogin, setIsLogin] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const checkUserIsLogin = async () => {
        const userToken = await getUserToken();
        setIsLogin(userToken !== "none");
      };
      checkUserIsLogin();
    }, [])
  );
  return isLogin ? <AccountScreen /> : <UnauthAccountScreen />;
}
