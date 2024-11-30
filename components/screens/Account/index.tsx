import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import Icon from 'react-native-vector-icons/MaterialIcons';
import guestAvatar from "@/assets/images/guest_avatar.png";
import { TabsBarHeight } from "@/constants/Height";
import { useFetchUserData } from "@/hooks/useFetchUserData";
import { logout } from "@/services/authService";
import { getUserInfo } from "@/services/userService";
import Icon from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";

export default function AccountScreen() {
  const handleLogout = async () => {
    await logout();
    router.replace("/(tabs)/");
  };
  const { user, loading, error } = useFetchUserData(getUserInfo);
  if (loading) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View>
        <Text>No user data availabl</Text>
      </View>
    );
  }
  return (
    <LinearGradient colors={["#E6EEFF", "#FFFFFF"]} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <Image source={guestAvatar} style={styles.avatar} />
          <Text style={styles.profileName}>{user?.fullName}</Text>
          <Text style={styles.profilePoints}>Xu thành viên: 0 Điểm</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome6 name="person" size={24} color="#000" />
            <Text style={styles.menuText}>Thông tin cá nhân</Text>
            <FontAwesome name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="setting" size={24} color="#000" />
            <Text style={styles.menuText}>Cài đặt tài khoản</Text>
            <FontAwesome name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dịch vụ</Text>
          <TouchableOpacity
            onPress={() => router.push("/cardlist")}
            style={styles.menuItem}
          >
            <FontAwesome name="credit-card" size={24} color="#000" />
            <Text style={styles.menuText}>Thẻ bảo hiểm</Text>
            <FontAwesome name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="description" size={24} color="#000" />
            <Text style={styles.menuText}>Hợp đồng bảo hiểm</Text>
            <FontAwesome name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hệ thống</Text>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="description" size={24} color="#000" />
            <Text style={styles.menuText}>Điều khoản dịch vụ</Text>
            <FontAwesome name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="shield" size={24} color="#000" />
            <Text style={styles.menuText}>Chính sách về quyền riêng tư</Text>
            <FontAwesome name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity style={styles.languageButton}>
          <FontAwesome name="language" size={24} color="#007AFF" />
          <Text style={styles.languageButtonText}>English</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteAccountButton}>
          <Text style={styles.deleteAccountButtonText}>Xóa tài khoản</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    paddingBottom: TabsBarHeight,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  phoneInputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  countryCode: {
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    flex: 1,
    color: "#666",
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#FF69B4",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profilePoints: {
    color: "#666",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
  },
  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  languageButtonText: {
    color: "#007AFF",
    marginLeft: 10,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#666",
  },
  deleteAccountButton: {
    margin: 20,
    padding: 15,
    alignItems: "center",
  },
  deleteAccountButtonText: {
    color: "#FF3B30",
  },
  guestHeader: {
    alignItems: "center",
    padding: 40,
  },
  guestAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  guestTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  guestSubtitle: {
    color: "#666",
  },
});
