import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import insuranceCard from "@/assets/images/insurance-card.jpg";
import { TabsBarHeight } from "@/constants/Height";
import { Link, router, useFocusEffect } from "expo-router";
import { useFetchUserData } from "@/hooks/useFetchUserData";
import { getUserInfo } from "@/services/userService";
import { getUserToken } from "@/services/authService";
import Header from "./Header";
import guestAvatar from "@/assets/images/guest_avatar.png";

const categories = [
  { id: 1, name: "Sức khỏe", icon: "favorite" },
  { id: 2, name: "Xe máy", icon: "favorite" },
  { id: 3, name: "Ô tô", icon: "favorite" },
  { id: 4, name: "Nhà ở", icon: "favorite" },
  { id: 5, name: "Du lịch", icon: "favorite" },
];

export default function HomeScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const { user, loading, error } = useFetchUserData(getUserInfo);

  useFocusEffect(
    useCallback(() => {
      const checkUserIsLogin = async () => {
        const userToken = await getUserToken();
        setIsLogin(userToken !== "none");
      };
      checkUserIsLogin();
    }, [])
  );

  if (isLogin) {
    // if (!isLogin) {
    //   // Nếu người dùng chưa đăng nhập
    //   return (
    //     <View>
    //       <Text>Please log in to access user data</Text>
    //     </View>
    //   );
    // }

    // Khi đang tải dữ liệu
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    // Nếu có lỗi
    if (error) {
      return (
        <View>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      );
    }
  }

  // Nếu không có dữ liệu người dùng
  // if (!user) {
  //   return (
  //     <View>
  //       <Text>No user data available</Text>
  //     </View>
  //   );
  // }
  return (
    <LinearGradient
      colors={["#E6EEFF", "#FFFFFF"]}
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safeArea}>
        <ScrollView>
          {/* Header */}

          <View style={homeStyles.header}>
            <View style={homeStyles.userInfo}>
              <Image source={guestAvatar} style={homeStyles.avatar} />
              <View style={homeStyles.userTexts}>
                <Text style={homeStyles.userName}>
                  {isLogin ? user?.fullName : "Khách"}
                </Text>
                {isLogin ? (
                  <Text style={homeStyles.userPoints}>
                    Xu thành viên: 0 điểm
                  </Text>
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
          {/* Categories */}
          <View style={homeStyles.categories}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={homeStyles.categoryItem}
              >
                <View style={homeStyles.categoryIcon}>
                  <MaterialIcons name={"favorite"} size={24} color="#007AFF" />
                </View>
                <Text style={homeStyles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Empty State Card */}
          <View style={homeStyles.sideLabel}>
            <View style={homeStyles.sideLabelContent}>
              <Text style={homeStyles.sideLabelText}>Thẻ BH của tôi</Text>
              <View style={homeStyles.sideLabelLine} />
            </View>
          </View>

          <View style={homeStyles.emptyCard}>
            <FontAwesome name="shield" size={40} color="#C0C0C0" />
            <Text style={homeStyles.emptyCardText}>
              Bạn Chưa Có Thẻ Bảo Hiểm
            </Text>
          </View>

          {/* Buy Insurance Button */}
          <TouchableOpacity
            onPress={() => router.push("/insuranceSearch")}
            style={homeStyles.buyButton}
          >
            <MaterialIcons name="add-circle-outline" size={24} color="#FFF" />
            <Text style={homeStyles.buyButtonText}>Mua Bảo Hiểm</Text>
          </TouchableOpacity>

          {/* Stats Cards */}
          <View style={homeStyles.statsContainer}>
            <View style={homeStyles.statCard}>
              <MaterialIcons name="description" size={24} color="#007AFF" />
              <View style={homeStyles.statContent}>
                <Text style={homeStyles.statTitle}>Hợp đồng</Text>
                <Text style={homeStyles.statValue}>0 hợp đồng</Text>
              </View>
            </View>
            <View style={homeStyles.statCard}>
              <Icon name="star" size={24} color="#007AFF" />
              <View style={homeStyles.statContent}>
                <Text style={homeStyles.statTitle}>Sử dụng điểm</Text>
                <Text style={homeStyles.statValue}>0 điểm</Text>
              </View>
            </View>
          </View>

          {/* Featured Products */}
          <View style={homeStyles.featuredSection}>
            <View style={homeStyles.featuredHeader}>
              <Text style={homeStyles.featuredTitle}>Sản Phẩm Nổi Bật</Text>
              <TouchableOpacity>
                <Text style={homeStyles.viewAllText}>Xem Tất Cả</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={homeStyles.productCard}>
              <Image source={insuranceCard} style={homeStyles.productImage} />
              <View style={homeStyles.productBadge}>
                <Text style={homeStyles.badgeText}>BH Sức Khỏe</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export const homeStyles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    paddingBottom: TabsBarHeight,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userTexts: {
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userPoints: {
    fontSize: 12,
    color: "#666",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: "center",
    width: 70,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    textAlign: "center",
  },
  sideLabel: {
    position: "absolute",
    left: 0,
    top: 200,
    width: 30,
    height: 120,
    justifyContent: "center",
  },
  sideLabelContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  sideLabelText: {
    transform: [{ rotate: "-90deg" }],
    fontSize: 12,
    color: "#666",
    width: 120,
    textAlign: "center",
  },
  sideLabelLine: {
    width: 2,
    height: 120,
    backgroundColor: "#007AFF",
    marginLeft: -60,
  },
  emptyCard: {
    margin: 16,
    padding: 32,
    backgroundColor: "#FFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyCardText: {
    marginTop: 12,
    color: "#666",
    fontSize: 14,
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  buyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  featuredSection: {
    padding: 16,
  },
  featuredHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    color: "#007AFF",
    fontSize: 14,
  },
  productCard: {
    borderRadius: 12,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  productBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   Image,
//   StatusBar,
//   ScrollView,
// } from "react-native";

// import backgroundImage from "@/assets/images/background.jpg";
// import userImage from "@/assets/images/userimage.jpg";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { BlurView } from "expo-blur";
// import { Link } from "expo-router";
// import ShieldUserIcon from "@/components/icons/shield-user.svg";
// import MotoIcon from "@/components/icons/moto.svg";
// import CarIcon from "@/components/icons/car.svg";
// import HomeIcon from "@/components/icons/home.svg";
// import LuggageIcon from "@/components/icons/luggage.svg";

// import IconButton from "@/components/IconButton";
// import Header from "./Header";
// import InsurOption from "./InsurOption";
// import InsurBadge from "./InsurBadge";
// import UserInsurInfo from "./UserInsurInfo";
// import OutstandingInsur from "./OutstandingInsur";
// import { TabsBarHeight } from "@/constants/Height";
// import { globalStyles } from "@/components/style/GlobalStyle";

// export default function Home() {
//   return (
//     <ImageBackground
//       source={backgroundImage}
//       resizeMode="cover"
//       style={globalStyles.imageBackground}
//     >
//       <BlurView intensity={120} style={homeStyles.container}>
//         <ScrollView>
//           <Header />
//           <InsurOption />
//           <InsurBadge />
//           <UserInsurInfo />
//           <OutstandingInsur />
//         </ScrollView>
//       </BlurView>
//     </ImageBackground>
//   );
// }

// const homeStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingHorizontal: 12,
//     marginTop: StatusBar.currentHeight,
//   },

//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   headerSection: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 5,
//   },
//   insurBadge: {
//     backgroundColor: "#EFE7FE",
//     borderWidth: 5,
//     borderColor: "white",
//     margin: 10,
//     height: 160,
//     borderRadius: 15,
//   },
// });
