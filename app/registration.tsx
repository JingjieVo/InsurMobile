import { registerUser } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [form, setForm] = useState<RegistrationData>({
    fullname: "",
    phone_number: "",
    address: "",
    password: "",
    email: "",
    retype_password: "",
    date_of_birth: "",
    avatar: "",
    role_id: 2,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Partial<RegistrationData>>({});

  const handleChange = (name: keyof RegistrationData, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setForm((prevForm) => ({
        ...prevForm,
        date_of_birth: selectedDate.toISOString().split("T")[0],
      }));
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setForm((prevForm) => ({ ...prevForm, avatar: result.assets[0].uri }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<RegistrationData> = {};

    if (!form.fullname) newErrors.fullname = "Tên là bắt buộc";
    if (!form.phone_number) newErrors.phone_number = "Số điện thoại là bắt buộc";
    if (!form.address) newErrors.address = "Địa chỉ là bắt buộc";
    if (!form.email) newErrors.email = "Email là bắt buộc";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email không hợp lệ";
    if (!form.password) newErrors.password = "Mật khẩu là bắt buộc";
    else if (form.password.length < 8)
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    if (form.password !== form.retype_password)
      newErrors.retype_password = "Không khớp với mật khẩu";
    if (!form.date_of_birth)
      newErrors.date_of_birth = "Ngày sinh là bắt buộc";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await registerUser(form);
        Alert.alert("Đăng ký thành công", "Đăng ký thành công");
        router.replace("/login");
      } catch (error) {
        Alert.alert("có lỗi xảy ra", "Đăng ký thất bại");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đăng ký tài khoản</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          value={form.fullname}
          onChangeText={(text) => handleChange("fullname", text)}
          placeholder="VD: Nguyen Van A"
        />
        {errors.fullname && (
          <Text style={styles.errorText}>{errors.fullname}</Text>
        )}

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={form.phone_number}
          onChangeText={(text) => handleChange("phone_number", text)}
          placeholder="0919146976"
          keyboardType="phone-pad"
        />
        {errors.phone_number && (
          <Text style={styles.errorText}>{errors.phone_number}</Text>
        )}

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={styles.input}
          value={form.address}
          onChangeText={(text) => handleChange("address", text)}
          placeholder="Nhập địa chỉ"
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Nhập Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="Nhập mật khẩu"
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <Text style={styles.label}>Nhập lại mật khẩu</Text>
        <TextInput
          style={styles.input}
          value={form.retype_password}
          onChangeText={(text) => handleChange("retype_password", text)}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
        />
        {errors.retype_password && (
          <Text style={styles.errorText}>{errors.retype_password}</Text>
        )}

        <Text style={styles.label}>Ngày sinh</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{form.date_of_birth || "Chọn ngày sinh"}</Text>
        </TouchableOpacity>
        {errors.date_of_birth && (
          <Text style={styles.errorText}>{errors.date_of_birth}</Text>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={
              form.date_of_birth ? new Date(form.date_of_birth) : new Date()
            }
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Hình đại diện</Text>
        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
          {form.avatar ? (
            <Image source={{ uri: form.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="camera" size={24} color="#666" />
              <Text style={styles.avatarText}>Thêm ảnh</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center', padding: 16}} onPress={() => router.push("/login")}>
          <Text style={{color: 'red'}}>Bạn đã có tài khoản?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 24,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    marginTop: 8,
    color: "#666",
  },
  button: {
    backgroundColor: "#FF69B4",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
