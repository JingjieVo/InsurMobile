import insuranceCard from "@/assets/images/insurance-card.jpg";
import { getClaims } from "@/services/claimService";
import { getUserContracts } from "@/services/contractService";
import { Claim } from "@/type/claimType";
import { Contract } from "@/type/contractType";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Icon from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { homeStyles } from "../Home";
const InsuranceCardScreen = ({}) => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const y = useRef();

  function onRefresh() {
    router.reload();
  }
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await getClaims();
        if (response.status === "OK") {
          setClaims(response.data);
        }
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    const fetchContracts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await getUserContracts();
        const data = response;
        if (data.status === "OK") {
          setContracts(data.data);
        } else {
          setError("Failed to fetch contracts");
        }
      } catch (err) {
        setError("An error occurred while fetching contracts");
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
    fetchClaims();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="chevron-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thẻ Bảo Hiểm</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <FontAwesome name="download" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Icon name="time" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {contracts.length > 0 ? (
          <TouchableOpacity style={homeStyles.productCard}>
            <Image source={insuranceCard} style={homeStyles.productImage} />
            <View style={homeStyles.productBadge}>
              <Text style={homeStyles.badgeText}>BH Sức Khỏe</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.noCardContainer}>
            <View style={styles.iconContainer}>
              <Icon name="shield-outline" size={40} color="#B0C4DE" />
            </View>
            <Text style={styles.noCardText}>Bạn Chưa Có Thẻ</Text>
            <Text style={styles.noCardText}>Bảo Hiểm Nào</Text>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>
              Thông tin thẻ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Địa chỉ nộp hồ sơ</Text>
          </TouchableOpacity>
        </View>

        {/* Hospital List */}
        <View style={styles.hospitalSection}>
          <Text style={styles.hospitalTitle}>DANH SÁCH BỆNH VIỆN BẢO LÃNH</Text>
          <TouchableOpacity style={styles.hospitalItem}>
            <View style={styles.hospitalInfo}>
              <Icon name="business-outline" size={24} color="#000" />
              <View style={styles.hospitalTextContainer}>
                <Text style={styles.hospitalItemTitle}>
                  Số lượng bệnh viện bảo lãnh{"\n"}trên toàn quốc
                </Text>
                <Text style={styles.hospitalCount}>0 bệnh viện</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={24} color="#C0C0C0" />
          </TouchableOpacity>
        </View>
        <View style={styles.claimsSection}>
          <Text style={styles.claimsTitle}>YÊU CẦU BỒI THƯỜNG</Text>
          {claims.length > 0 ? (
            claims.map((claim) => (
              <View key={claim.id} style={styles.claimItem}>
                <View style={styles.claimInfo}>
                  <Text style={styles.claimItemTitle}>{claim.description}</Text>
                  <Text style={styles.claimAmount}>
                    {claim.amountClaim.toLocaleString("vi-VN")} VND
                  </Text>
                </View>
                <View
                  style={[
                    styles.claimStatus,
                    claim.status === 0
                      ? styles.statusPending
                      : claim.status === 1
                      ? styles.statusApproved
                      : styles.statusDeclined,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {claim.status === 0
                      ? "Đang chờ"
                      : claim.status === 1
                      ? "Đã duyệt"
                      : "Từ Chối"}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noCardContainer}>
              {/* <View style={styles.iconContainer}>
            <Icon name="shield-outline" size={40} color="#B0C4DE" />
          </View> */}
              <Text style={styles.noCardText}>Bạn Chưa Có</Text>
              <Text style={styles.noCardText}>Yêu Cầu Bồi Thường Nào</Text>
            </View>
          )}
          {}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity
        onPress={() => router.push("/claimRequest")}
        style={styles.bottomButton}
      >
        <Icon name="time" size={24} color="#fff" />
        <Text style={styles.bottomButtonText}>Yêu Cầu Bồi Thường</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  headerRight: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  noCardContainer: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 32,
    borderRadius: 16,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F8FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  noCardText: {
    fontSize: 16,
    color: "#808080",
    lineHeight: 24,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    textAlign: "center",
    color: "#808080",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  hospitalSection: {
    backgroundColor: "#fff",
    padding: 16,
  },
  hospitalTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },
  hospitalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
  },
  hospitalInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  hospitalTextContainer: {
    marginLeft: 16,
  },
  hospitalItemTitle: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  hospitalCount: {
    fontSize: 14,
    color: "#000",
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF69B4",
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  claimsSection: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
  },
  claimsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 16,
  },
  claimItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  claimInfo: {
    flex: 1,
  },
  claimItemTitle: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  claimAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  claimStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusPending: {
    backgroundColor: "yellow",
  },
  statusApproved: {
    backgroundColor: "green",
  },
  statusDeclined: {
    backgroundColor: "red",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
  },
});

export default InsuranceCardScreen;
