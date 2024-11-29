import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "react-native-image-picker";
import uploadImg from "@/assets/images/guest_avatar.png";
import DateTimePicker from "@react-native-community/datetimepicker";
interface FormData {
  dateOfBirth: any;
  fullName: string | undefined;
  isInsured: boolean | undefined;
  gender: "male" | "female";
  phone: string;
  email: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  houseNumber: string;
  idType: "CMND" | "CCCD" | "Passport";
  idNumber: string;
  frontImage: string | null;
  backImage: string | null;
}

interface FormErrors {
  phone?: string;
  email?: string;
  idNumber?: string;
}

const BuyInsuranceScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    email: "",
    province: "",
    district: "",
    ward: "",
    street: "",
    houseNumber: "",
    idType: "CMND",
    idNumber: "",
    frontImage: null,
    backImage: null,
    isInsured: true,
    gender: "male",
    fullName: "",
    dateOfBirth: Date,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleImagePick = async (type: "frontImage" | "backImage") => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: "photo",
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibrary(options);
    if (result.assets && result.assets[0] && result.assets[0].uri) {
      setFormData({
        ...formData,
        [type]: result.assets[0].uri,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.email) newErrors.email = "Vui lòng nhập email";
    if (!formData.idNumber)
      newErrors.idNumber = "Vui lòng nhập CMND/CCCD/Passport";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Handle form submission
      console.log("Form data:", formData);
    }
  };
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <LinearGradient colors={["#E6EEFF", "#FFFFFF"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Thông tin người được bảo hiểm</Text>
          <Text style={styles.subtitle}>
            Bạn cần cung cấp thông tin cá nhân chính xác để được hưởng quyền lợi
            sau này
          </Text>

          <View style={styles.switchContainer}>
            <Text>Bạn là người được bảo hiểm?</Text>
            <Switch
              value={formData.isInsured}
              onValueChange={(value) =>
                setFormData({ ...formData, isInsured: value })
              }
            />
          </View>

          <Text style={styles.label}>Đối tượng được bảo hiểm</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.gender === "male" && styles.genderButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, gender: "male" })}
            >
              <Text
                style={
                  formData.gender === "male"
                    ? styles.genderTextActive
                    : styles.genderText
                }
              >
                Ông
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.gender === "female" && styles.genderButtonActive,
              ]}
              onPress={() => setFormData({ ...formData, gender: "female" })}
            >
              <Text
                style={
                  formData.gender === "female"
                    ? styles.genderTextActive
                    : styles.genderText
                }
              >
                Bà
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>HỌ VÀ TÊN</Text>
          <TextInput
            style={styles.input}
            placeholder="Ví dụ: Nguyễn Văn A"
            value={formData.fullName}
            onChangeText={(text) =>
              setFormData({ ...formData, fullName: text })
            }
          />

          <Text style={styles.label}>NGÀY SINH</Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{formData.dateOfBirth.toLocaleDateString("vi-VN")}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.dateOfBirth}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || formData.dateOfBirth;
                setShowDatePicker(Platform.OS === "ios");
                setFormData({ ...formData, dateOfBirth: currentDate });
              }}
            />
          )}
          {/* Phone Input */}
          <View style={styles.section}>
            <Text style={styles.label}>SỐ ĐIỆN THOẠI</Text>
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCode}>
                <Text>🇻🇳 +84</Text>
              </View>
              <TextInput
                style={[styles.input, styles.phoneInput]}
                placeholder="12 345 6789"
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData({ ...formData, phone: text })
                }
                keyboardType="phone-pad"
              />
            </View>
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          {/* Email Input */}
          <View style={styles.section}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="username@domain.com"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Address Section */}
          <View style={styles.section}>
            <Text style={styles.label}>ĐỊA CHỈ</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.province}
                onValueChange={(value) =>
                  setFormData({ ...formData, province: value })
                }
                style={styles.picker}
              >
                <Picker.Item label="Tỉnh/Thành phố" value="" />
                {/* Add provinces here */}
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Quận/huyện"
              value={formData.district}
              onChangeText={(text) =>
                setFormData({ ...formData, district: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phường/xã"
              value={formData.ward}
              onChangeText={(text) => setFormData({ ...formData, ward: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Đường/ấp"
              value={formData.street}
              onChangeText={(text) =>
                setFormData({ ...formData, street: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Số nhà"
              value={formData.houseNumber}
              onChangeText={(text) =>
                setFormData({ ...formData, houseNumber: text })
              }
            />
          </View>

          {/* ID Document Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Giấy tờ tuỳ thân</Text>
            <View style={styles.idTypeContainer}>
              {(["CMND", "CCCD", "Passport"] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.idTypeButton,
                    formData.idType === type && styles.idTypeButtonActive,
                  ]}
                  onPress={() => setFormData({ ...formData, idType: type })}
                >
                  <Text
                    style={[
                      styles.idTypeText,
                      formData.idType === type && styles.idTypeTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>MÃ SỐ ĐỊNH DANH</Text>
            <TextInput
              style={styles.input}
              placeholder="Ví dụ: 123 4567 890 123"
              value={formData.idNumber}
              onChangeText={(text) =>
                setFormData({ ...formData, idNumber: text })
              }
              keyboardType="numeric"
            />
            {errors.idNumber && (
              <Text style={styles.errorText}>{errors.idNumber}</Text>
            )}

            <View style={styles.imageUploadContainer}>
              <TouchableOpacity
                style={styles.imageUploadButton}
                onPress={() => handleImagePick("frontImage")}
              >
                <Image
                  source={
                    formData.frontImage
                      ? { uri: formData.frontImage }
                      : uploadImg
                  }
                  style={styles.uploadIcon}
                />
                <Text style={styles.uploadText}>Mặt trước</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.imageUploadButton}
                onPress={() => handleImagePick("backImage")}
              >
                <Image
                  source={
                    formData.backImage ? { uri: formData.backImage } : uploadImg
                  }
                  style={styles.uploadIcon}
                />
                <Text style={styles.uploadText}>Mặt Sau</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },

  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 12,
  },
  countryCode: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
  },
  picker: {
    height: 50,
  },
  idTypeContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  idTypeButton: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  idTypeButtonActive: {
    backgroundColor: "#007AFF",
  },
  idTypeText: {
    color: "#666666",
    fontWeight: "500",
  },
  idTypeTextActive: {
    color: "white",
  },
  imageUploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  imageUploadButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  uploadIcon: {
    width: 32,
    height: 32,
    marginBottom: 8,
  },
  uploadText: {
    color: "#666666",
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: "#FF69B4",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginVertical: 24,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
  backButton: {
    padding: 10,
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  genderContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
    marginRight: 8,
  },
  genderButtonActive: {
    backgroundColor: "#007AFF",
  },
  genderText: {
    color: "#007AFF",
  },
  genderTextActive: {
    color: "white",
  },
  // label: {
  //   fontSize: 16,
  //   marginBottom: 8,
  // },
  // input: {
  //   height: 40,
  //   borderColor: "gray",
  //   borderWidth: 1,
  //   marginBottom: 24,
  //   paddingHorizontal: 10,
  // },
  datePickerButton: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
});

export default BuyInsuranceScreen;
