import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { apiClient } from '@/utils/api';

interface InsuranceRequestBody {
  startDate: string;
  endDate: string;
  name: string;
  dob: string;
  gender: string;
  identification: string;
  phone: string;
  email: string;
  address: string;
  contractDetailDTO: {
    productId: number;
    name: string;
    dob: string;
    gender: string;
    identification: string;
    phone: string;
    email: string;
    address: string;
    mainTerms: { id: number }[];
    sideTerms: { id: number }[];
  };
  totalPrice: number; // Add this line
}

export default function InsuranceConfirmScreen() {
  const params = useLocalSearchParams();
  const requestBody: InsuranceRequestBody = JSON.parse(params.requestBody as string);

  const handleEdit = () => {
    router.back();
  };

  const handleConfirm = async () => {
    try {
      const response = await apiClient.post('contracts', requestBody);
      if (response.status === 200) {
        // Assuming the API returns payment details in the response
        const paymentDetails = {
          refNumber: response.data.refNumber || "000085752257",
          paymentTime: response.data.paymentTime || new Date().toLocaleString('en-US', { hour12: false }),
          paymentMethod: response.data.paymentMethod || "Bank Transfer",
          senderName: requestBody.name,
          amount: response.data.amount || requestBody.totalPrice,
          adminFee: requestBody.totalPrice*0.05 || 193.00,
          totalPrice: requestBody.totalPrice // Add this line
        };

        router.push({
          pathname: "/insuranceSuccess",
          params: { paymentDetails: JSON.stringify(paymentDetails) }
        });
      } else {
        throw new Error("Failed to purchase insurance");
      }
    } catch (error) {
      console.error("Error purchasing insurance:", error);
      Alert.alert("Lỗi", "Không thể đăng ký bảo hiểm. Vui lòng thử lại.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <FontAwesome name="user-circle" size={64} color="#000" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Người được bảo hiểm</Text>
          <Text style={styles.name}>
            {requestBody.gender === 'Male' ? 'Ông' : 'Bà'}. {requestBody.name}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoColumn}>
            <Text style={styles.label}>Giấy tờ tùy thân</Text>
            <Text style={styles.value}>{requestBody.identification}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.label}>Ngày sinh</Text>
            <Text style={styles.value}>
              {new Date(requestBody.dob).toLocaleDateString('vi-VN')}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>
          
          <View style={styles.contactInfo}>
            <Text style={styles.label}>Điện thoại</Text>
            <Text style={styles.value}>{requestBody.phone}</Text>
          </View>
          
          <View style={styles.contactInfo}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{requestBody.email}</Text>
          </View>
          
          <View style={styles.contactInfo}>
            <Text style={styles.label}>Địa chỉ</Text>
            <Text style={styles.value}>{requestBody.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tổng chi phí</Text>
          <Text style={styles.totalPrice}>
            IDR {requestBody.totalPrice}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]} 
            onPress={handleEdit}
          >
            <Text style={styles.editButtonText}>Sửa thông tin</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.confirmButton]} 
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoColumn: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  contactInfo: {
    marginBottom: 16,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF69B4',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  confirmButton: {
    backgroundColor: '#FF69B4',
  },
  editButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

