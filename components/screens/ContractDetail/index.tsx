import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getContractDetail } from "@/services/contractService"; // Import service
import { ContractDetail } from "@/type/contractType";
import ScreenHeader from "@/components/ScreenHeader";
import { BenefitCard } from "@/components/BenefitCard";

export default function ContractDetailScreen() {
  const { id } = useLocalSearchParams(); // Lấy ID từ URL params
  const [contract, setContract] = useState<ContractDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchContractDetail(Number(id)); // Gọi hàm fetch chi tiết hợp đồng
    }
  }, [id]);

  const fetchContractDetail = async (contractId: number) => {
    try {
      const data = await getContractDetail(contractId); // Gọi service để lấy dữ liệu
      setContract(data.data); // Lưu dữ liệu hợp đồng vào state
    } catch (err) {
      setError("An error occurred while fetching contract details");
    } finally {
      setLoading(false); // Dừng trạng thái loading
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center" }}
        size="large"
        color="#0000ff"
      />
    );
  }

  if (error || !contract) {
    return (
      <Text style={styles.errorText}>{error || "Contract not found"}</Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ScreenHeader title="Thông tin hợp đồng" />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin hợp đồng</Text>
        <Text style={styles.label}>Tên sản phẩm:</Text>
        <Text style={styles.value}>{contract.contractDetail.productName}</Text>
        <Text style={styles.label}>Trạng thái:</Text>
        <Text style={styles.value}>
          {contract.status === 1 ? "Đang hiệu lực" : "Hết hiệu lực"}
        </Text>
        <Text style={styles.label}>Thời hạn:</Text>
        <Text style={styles.value}>
          {new Date(contract.startDate).toLocaleDateString("vi-VN")} -{" "}
          {new Date(contract.endDate).toLocaleDateString("vi-VN")}
        </Text>
        <Text style={styles.label}>Giá:</Text>
        <Text style={styles.value}>
          {contract.price.toLocaleString("vi-VN")} VND
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin người được bảo hiểm</Text>
        <Text style={styles.label}>Tên:</Text>
        <Text style={styles.value}>{contract.name}</Text>
        <Text style={styles.label}>Ngày sinh:</Text>
        <Text style={styles.value}>
          {new Date(contract.dob).toLocaleDateString("vi-VN")}
        </Text>
        <Text style={styles.label}>Giới tính:</Text>
        <Text style={styles.value}>
          {contract.gender === "MALE" ? "Nam" : "Nữ"}
        </Text>
        <Text style={styles.label}>Số CMND/CCCD:</Text>
        <Text style={styles.value}>{contract.identification}</Text>
        <Text style={styles.label}>Số điện thoại:</Text>
        <Text style={styles.value}>{contract.phone}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{contract.email}</Text>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.value}>{contract.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Điều khoản chính</Text>
        {contract.contractDetail.contractMainTerms.map((term, index) => (
          // <View key={term.id} style={styles.term}>
          //   <Text style={styles.termName}>{term.name}</Text>
          //   <Text style={styles.termDescription}>{term.description}</Text>
          //   <Text style={styles.termAmount}>
          //     {term.amount.toLocaleString("vi-VN")} VND
          //   </Text>
          // </View>
          <BenefitCard key={index} benefit={term}/>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Điều khoản phụ</Text>
        {contract.contractDetail.contractSideTerms.map((term, index) => (
          // <View key={term.id} style={styles.term}>
          //   <Text style={styles.termName}>{term.name}</Text>
          //   <Text style={styles.termDescription}>{term.description}</Text>
          //   <Text style={styles.termAmount}>
          //     {term.amount.toLocaleString("vi-VN")} VND
          //   </Text>
          // </View>
          <BenefitCard key={index} benefit={term}/>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    padding: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
  },
  term: {
    marginBottom: 16,
  },
  termName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  termDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  termAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
