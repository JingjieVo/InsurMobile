import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import logo from "@/assets/images/react-logo.png";
import { getProductById } from "@/services/productService";
import { ProductDetailResponse } from "@/type/productType";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Icon from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const InsuranceDetailsScreen = (props: { id: string }) => {
  const tabs = ["Đồng", "Bạc"];
  const [product, setProduct] = useState<ProductDetailResponse>();
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getProductById(props.id);
        setProduct(data);
        // console.log(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetch();
  }, []);
  if (!product) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center" }}
        size="large"
        color="#0000ff"
      />
    );
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#0088cc", "#005c99"]} style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <View style={styles.backButtonCircle}>
            <Entypo name="chevron-left" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            Tai nạn cá nhân GIC - Gia Đình - Kim Cương
          </Text>
          <Text style={styles.headerAmount}>901.250.000 VND</Text>
        </View>
        <Image source={logo} style={styles.logo} />
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, index === 3 && styles.activeTab]}
            >
              <Text
                style={[styles.tabText, index === 3 && styles.activeTabText]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Quyền lợi chính</Text>

        {/* Tabs */}

        {/* Benefits List */}
        {product?.mainTerms.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <View style={styles.benefitIcon}>
              <FontAwesome6 name="feather" size={24} color="#000" />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>{benefit.name}</Text>
              <Text style={styles.benefitAmount}>{benefit.amount}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.sectionTitle}>Quyền lợi phụ</Text>

        {/* Tabs */}

        {/* Benefits List */}
        {product?.sideTerms.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <View style={styles.benefitIcon}>
              <FontAwesome6 name="feather" size={24} color="#000" />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>{benefit.name}</Text>
              <Text style={styles.benefitAmount}>{benefit.amount}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.insuranceFee}>
          <Text style={styles.feeLabel}>Phí bảo hiểm</Text>
          <Text style={styles.feeAmount}>1.200.000 VND</Text>
        </View>

        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.termDropdown}>
            <Text>Thời hạn bảo hiểm</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>1 năm</Text>
              <Icon name="chevron-down" size={20} color="#000" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/buyinsurance")}
            style={styles.buyButton}
          >
            <Entypo name="shopping-cart" size={20} color="#fff" />
            <Text style={styles.buyButtonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.termsLink}>
          <Text style={styles.termsText}>
            Xem thêm về điều khoản, chính sách và thông tin khác của bảo hiểm
            này
          </Text>
          <Entypo name="chevron-right" size={20} color="#002D84" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    height: 180,
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    marginTop: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  headerAmount: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#002D84",
  },
  tabText: {
    color: "#666",
  },
  activeTabText: {
    color: "#002D84",
    fontWeight: "500",
  },
  benefitCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F8FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  benefitAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  insuranceFee: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  feeLabel: {
    fontSize: 16,
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomActions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  termDropdown: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  buyButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FF69B4",
    borderRadius: 8,
    gap: 8,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  termsLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  termsText: {
    flex: 1,
    color: "#002D84",
    fontSize: 14,
  },
});

export default InsuranceDetailsScreen;
