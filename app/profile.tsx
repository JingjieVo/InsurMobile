import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { getUserInfo, getUserProfile, updateUserProfile } from '@/services/userService';

interface FormData {
  gender: 'male' | 'female';
  fullName: string;
  dateOfBirth: Date | null;
  phoneNumber: string;
  companyName: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  houseNumber: string;
  idType: 'CMND' | 'CCCD' | 'Passport';
  idNumber: string;
  frontImage: string | null;
  backImage: string | null;
}

export default function ProfileEditScreen() {
  const [form, setForm] = useState<FormData>({
    gender: 'male',
    fullName: '',
    dateOfBirth: null,
    phoneNumber: '',
    companyName: '',
    email: '',
    province: '',
    district: '',
    ward: '',
    street: '',
    houseNumber: '',
    idType: 'CMND',
    idNumber: '',
    frontImage: null,
    backImage: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response?.status === 'OK') {
          const data  = response.data;
          setForm(prev => ({
            ...prev,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,

          }));
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải thông tin người dùng');
      }
    };

    loadProfile();
  }, []);

  const handleImagePick = async (type: 'frontImage' | 'backImage') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setForm(prev => ({
        ...prev,
        [type]: result.assets[0].uri,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) {
          if (key === 'frontImage' || key === 'backImage') {
            if (value) {
              formData.append(key, {
                uri: value,
                type: 'image/jpeg',
                name: `${key}.jpg`,
              } as any);
            }
          } else if (key === 'dateOfBirth') {
            if (value) {
              formData.append(key, value.toISOString());
            }
          } else {
            formData.append(key, value);
          }
        }
      });
      

      const response = await updateUserProfile(formData);
      if (response.status === 'OK') {
        Alert.alert('Thành công', 'Cập nhật thông tin thành công');
        router.back();
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chỉnh sửa thông tin cá nhân</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Đối tượng được bảo hiểm</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              form.gender === 'male' && styles.genderButtonActive,
            ]}
            onPress={() => setForm(prev => ({ ...prev, gender: 'male' }))}
          >
            <Text style={[
              styles.genderText,
              form.gender === 'male' && styles.genderTextActive,
            ]}>Ông</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              form.gender === 'female' && styles.genderButtonActive,
            ]}
            onPress={() => setForm(prev => ({ ...prev, gender: 'female' }))}
          >
            <Text style={[
              styles.genderText,
              form.gender === 'female' && styles.genderTextActive,
            ]}>Bà</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>HỌ VÀ TÊN</Text>
        <TextInput
          style={styles.input}
          value={form.fullName}
          onChangeText={(text) => setForm(prev => ({ ...prev, fullName: text }))}
          placeholder="Ví dụ: Nguyễn Văn A"
        />

        <Text style={styles.label}>NGÀY SINH</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>
            {form.dateOfBirth ? form.dateOfBirth.toLocaleDateString('vi-VN') : 'Chọn ngày sinh'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>SỐ ĐIỆN THOẠI</Text>
        <View style={styles.phoneContainer}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+84</Text>
          </View>
          <TextInput
            style={[styles.input, styles.phoneInput]}
            value={form.phoneNumber}
            onChangeText={(text) => setForm(prev => ({ ...prev, phoneNumber: text }))}
            keyboardType="phone-pad"
            placeholder="Nhập số điện thoại"
          />
        </View>

        <Text style={styles.label}>CÔNG TY</Text>
        <TextInput
          style={styles.input}
          value={form.companyName}
          onChangeText={(text) => setForm(prev => ({ ...prev, companyName: text }))}
          placeholder="Tên công ty"
        />

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="example@email.com"
        />

        <Text style={styles.label}>ĐỊA CHỈ</Text>
        <TextInput
          style={styles.input}
          value={form.province}
          onChangeText={(text) => setForm(prev => ({ ...prev, province: text }))}
          placeholder="Tỉnh/Thành phố"
        />
        <TextInput
          style={styles.input}
          value={form.district}
          onChangeText={(text) => setForm(prev => ({ ...prev, district: text }))}
          placeholder="Quận/huyện"
        />
        <TextInput
          style={styles.input}
          value={form.ward}
          onChangeText={(text) => setForm(prev => ({ ...prev, ward: text }))}
          placeholder="Phường/xã"
        />
        <TextInput
          style={styles.input}
          value={form.street}
          onChangeText={(text) => setForm(prev => ({ ...prev, street: text }))}
          placeholder="Đường/ấp"
        />
        <TextInput
          style={styles.input}
          value={form.houseNumber}
          onChangeText={(text) => setForm(prev => ({ ...prev, houseNumber: text }))}
          placeholder="Số nhà"
        />

        <Text style={styles.sectionTitle}>Giấy tờ tuỳ thân</Text>
        <View style={styles.idTypeContainer}>
          {(['CMND', 'CCCD', 'Passport'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.idTypeButton,
                form.idType === type && styles.idTypeButtonActive,
              ]}
              onPress={() => setForm(prev => ({ ...prev, idType: type }))}
            >
              <Text style={[
                styles.idTypeText,
                form.idType === type && styles.idTypeTextActive,
              ]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>MÃ SỐ ĐỊNH DANH</Text>
        <TextInput
          style={styles.input}
          value={form.idNumber}
          onChangeText={(text) => setForm(prev => ({ ...prev, idNumber: text }))}
          placeholder="Ví dụ: 123 4567 890 123"
          keyboardType="numeric"
        />

        <View style={styles.imageUploadContainer}>
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={() => handleImagePick('frontImage')}
          >
            {form.frontImage ? (
              <Image source={{ uri: form.frontImage }} style={styles.uploadedImage} />
            ) : (
              <>
                <Ionicons name="camera-outline" size={24} color="#666" />
                <Text style={styles.uploadText}>Mặt trước</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={() => handleImagePick('backImage')}
          >
            {form.backImage ? (
              <Image source={{ uri: form.backImage }} style={styles.uploadedImage} />
            ) : (
              <>
                <Ionicons name="camera-outline" size={24} color="#666" />
                <Text style={styles.uploadText}>Mặt sau</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Lưu</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={form.dateOfBirth || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
              setForm(prev => ({ ...prev, dateOfBirth: selectedDate }));
            }
          }}
        />
      )}
    </ScrollView>
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 24,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#007AFF',
  },
  genderText: {
    color: '#007AFF',
  },
  genderTextActive: {
    color: '#fff',
  },
  phoneContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  countryCode: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
  },
  countryCodeText: {
    color: '#fff',
  },
  phoneInput: {
    flex: 1,
  },
  idTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  idTypeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  idTypeButtonActive: {
    backgroundColor: '#007AFF',
  },
  idTypeText: {
    color: '#666',
  },
  idTypeTextActive: {
    color: '#fff',
  },
  imageUploadContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  imageUploadButton: {
    flex: 1,
    aspectRatio: 1.5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: '#666',
    marginTop: 8,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

