import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

interface ClaimForm {
  contractId: number;
  amountClaim: number;
  note: string;
  description: string;
  upload: string;
  name: string;
  phone: string;
  email: string;
  bankAccount: string;
  bankName: string;
  bankBranch: string;
  bankNameOwner: string;
  admissionDate: Date;
  dischargeDate: Date;
  treatmentLocation: string;
  diagnosis: string;
  claimType: 'accident' | 'traffic';
}

export default function ClaimFormScreen() {
  const [form, setForm] = useState<ClaimForm>({
    contractId: 28,
    amountClaim: 0,
    note: '',
    description: '',
    upload: '',
    name: '',
    phone: '',
    email: '',
    bankAccount: '',
    bankName: '',
    bankBranch: '',
    bankNameOwner: '',
    admissionDate: new Date(),
    dischargeDate: new Date(),
    treatmentLocation: '',
    diagnosis: '',
    claimType: 'accident',
  });

  const [showAdmissionDate, setShowAdmissionDate] = useState(false);
  const [showDischargeDate, setShowDischargeDate] = useState(false);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setForm({ ...form, upload: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('your-api-endpoint', form);
      if (response.status === 200) {
        Alert.alert('Thành công', 'Yêu cầu bồi thường đã được gửi');
        router.back();
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể gửi yêu cầu bồi thường');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin, chứng từ</Text>
        <TouchableOpacity>
          <Ionicons name="download-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              form.claimType === 'accident' && styles.typeButtonActive,
            ]}
            onPress={() => setForm({ ...form, claimType: 'accident' })}
          >
            <Text style={[
              styles.typeText,
              form.claimType === 'accident' && styles.typeTextActive,
            ]}>Tai nạn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              form.claimType === 'traffic' && styles.typeButtonActive,
            ]}
            onPress={() => setForm({ ...form, claimType: 'traffic' })}
          >
            <Text style={[
              styles.typeText,
              form.claimType === 'traffic' && styles.typeTextActive,
            ]}>Tai nạn giao thông</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>NGÀY KHÁM/NHẬP VIỆN</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowAdmissionDate(true)}
        >
          <Text>{form.admissionDate.toLocaleDateString('vi-VN')}</Text>
          <Ionicons name="calendar" size={24} color="#4A90E2" />
        </TouchableOpacity>

        <Text style={styles.label}>NGÀY RA VIỆN</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowDischargeDate(true)}
        >
          <Text>{form.dischargeDate.toLocaleDateString('vi-VN')}</Text>
          <Ionicons name="calendar" size={24} color="#4A90E2" />
        </TouchableOpacity>

        <Text style={styles.label}>NƠI ĐIỀU TRỊ</Text>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm..."
          value={form.treatmentLocation}
          onChangeText={(text) => setForm({ ...form, treatmentLocation: text })}
        />
        <Text style={styles.hint}>Vui lòng chọn "Khác" nếu không có kết quả phù hợp</Text>

        <Text style={styles.label}>CHUẨN ĐOÁN</Text>
        <TextInput
          style={styles.input}
          value={form.diagnosis}
          onChangeText={(text) => setForm({ ...form, diagnosis: text })}
          multiline
        />

        <Text style={styles.label}>SỐ TIỀN YÊU CẦU (VND)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={form.amountClaim.toString()}
          onChangeText={(text) => setForm({ ...form, amountClaim: Number(text) })}
        />

        <Text style={styles.label}>THÔNG TIN CÁ NHÂN</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />

        <Text style={styles.label}>THÔNG TIN NGÂN HÀNG</Text>
        <TextInput
          style={styles.input}
          placeholder="Số tài khoản"
          keyboardType="numeric"
          value={form.bankAccount}
          onChangeText={(text) => setForm({ ...form, bankAccount: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên ngân hàng"
          value={form.bankName}
          onChangeText={(text) => setForm({ ...form, bankName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Chi nhánh"
          value={form.bankBranch}
          onChangeText={(text) => setForm({ ...form, bankBranch: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên chủ tài khoản"
          value={form.bankNameOwner}
          onChangeText={(text) => setForm({ ...form, bankNameOwner: text })}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={handlePickImage}>
          <Ionicons name="cloud-upload-outline" size={24} color="#4A90E2" />
          <Text style={styles.uploadText}>Tải lên chứng từ</Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, styles.noteInput]}
          placeholder="Ghi chú"
          multiline
          value={form.note}
          onChangeText={(text) => setForm({ ...form, note: text })}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Gửi yêu cầu</Text>
        </TouchableOpacity>
      </ScrollView>

      {showAdmissionDate && (
        <DateTimePicker
          value={form.admissionDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowAdmissionDate(false);
            if (selectedDate) {
              setForm({ ...form, admissionDate: selectedDate });
            }
          }}
        />
      )}

      {showDischargeDate && (
        <DateTimePicker
          value={form.dischargeDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDischargeDate(false);
            if (selectedDate) {
              setForm({ ...form, dischargeDate: selectedDate });
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  typeButtonActive: {
    backgroundColor: '#4A90E2',
  },
  typeText: {
    color: '#666',
  },
  typeTextActive: {
    color: 'white',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  dateInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
  },
  uploadText: {
    color: '#4A90E2',
    marginLeft: 8,
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 24,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
