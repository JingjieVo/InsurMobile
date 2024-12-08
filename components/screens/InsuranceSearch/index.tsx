import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getProviders } from "@/services/providerService";
import { ProviderCountItem } from "@/type/providerType";
import { Checkbox } from 'react-native-paper';

export default function InsuranceScreen() {
  const [insuranceType, setInsuranceType] = useState("Sức Khỏe");
  const [gender, setGender] = useState("Nam");
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [budget, setBudget] = useState(0);
  const [insuranceCompanies, setInsuranceCompanies] = useState<ProviderCountItem[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await getProviders();
        setInsuranceCompanies(data);
      } catch (err) {
        setError('Failed to fetch providers');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const toggleProviderSelection = (providerId: number) => {
    setSelectedProviders(prevSelected => 
      prevSelected.includes(providerId)
        ? prevSelected.filter(id => id !== providerId)
        : [...prevSelected, providerId]
    );
  };

  const handleSearch = () => {
    // Here you would typically call an API or filter the results
    // based on the selected providers
    console.log('Searching for providers with IDs:', selectedProviders);
    // For now, we'll just navigate to the results page
    router.push({
      pathname: '/insurance',
      params: { providerIds: selectedProviders.join(',') }
    });
  };

  if (loading) return  <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <LinearGradient colors={["#E6EEFF", "#FFFFFF"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Nhu cầu sản phẩm bảo hiểm</Text>

          <Text style={styles.label}>Loại bảo hiểm</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                insuranceType === "Sức Khỏe" && styles.selectedButton,
              ]}
              onPress={() => setInsuranceType("Sức Khỏe")}
            >
              <Text
                style={[
                  styles.optionText,
                  insuranceType === "Sức Khỏe" && styles.selectedText,
                ]}
              >
                Sức Khỏe
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                insuranceType === "Bảo Hiểm Nhà" && styles.selectedButton,
              ]}
              onPress={() => setInsuranceType("Bảo Hiểm Nhà")}
            >
              <Text
                style={[
                  styles.optionText,
                  insuranceType === "Bảo Hiểm Nhà" && styles.selectedText,
                ]}
              >
                Bảo Hiểm Nhà
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Sản phẩm dành cho</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                gender === "Nam" && styles.selectedButton,
              ]}
              onPress={() => setGender("Nam")}
            >
              <Text
                style={[
                  styles.optionText,
                  gender === "Nam" && styles.selectedText,
                ]}
              >
                Nam
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                gender === "Nữ" && styles.selectedButton,
              ]}
              onPress={() => setGender("Nữ")}
            >
              <Text
                style={[
                  styles.optionText,
                  gender === "Nữ" && styles.selectedText,
                ]}
              >
                Nữ
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Ngày sinh</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.input}>
              {birthdate.toLocaleDateString('vi-VN')}
            </Text>
            <Ionicons name="calendar" size={24} color="blue" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthdate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || birthdate;
                setShowDatePicker(Platform.OS === 'ios');
                setBirthdate(currentDate);
              }}
            />
          )}

          <Text style={styles.label}>Ngân sách bạn dành cho bảo hiểm</Text>
          <TextInput
            style={styles.budgetInput}
            placeholder="0 - 20.000.000 vnd"
            keyboardType="numeric"
            value={budget.toString() + " VND"}
            onChangeText={(value) => setBudget(Number(value))}
          />
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={20000000}
            value={budget}
            onValueChange={(value) => setBudget(value)}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="gray"
          />

          <Text style={styles.label}>Nhà bảo hiểm</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Tìm kiếm..." />
            <Ionicons name="search" size={24} color="gray" />
          </View>
          {insuranceCompanies.map((company) => (
            <View key={company.providerId} style={styles.companyContainer}>
              <Checkbox
                status={selectedProviders.includes(company.providerId) ? 'checked' : 'unchecked'}
                onPress={() => toggleProviderSelection(company.providerId)}
              />
              <Text style={styles.companyText}>
                {company.providerName} ({company.countProduct} sản phẩm)
              </Text>
            </View>
          ))}

          <TouchableOpacity onPress={handleSearch} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Lọc sản phẩm</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
    flex: 1,
  },
  backButton: {
    marginTop: 32,
    marginBottom: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginTop: 20,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#4a90e2",
  },
  optionText: {
    color: "#333",
    fontSize: 16,
  },
  selectedText: {
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  budgetInput: {
    fontSize: 16,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  slider: {
    marginBottom: 20,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  companyText: {
    fontSize: 16,
    color: "#333",
  },
  filterButton: {
    backgroundColor: "#ff5a5f",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

