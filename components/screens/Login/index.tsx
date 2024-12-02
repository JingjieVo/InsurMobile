// import ScreenContainer from "@/components/Share/ScreenContainer";
// import React, { Component } from "react";
// import { Text, View } from "react-native";

// export default function Login() {
//   return (
//     <ScreenContainer>
//         <View></View>
//     </ScreenContainer>
//   );
// }

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Link, router } from 'expo-router';
import { login, logout } from '@/services/authService';
export default function LoginScreen ({ }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const [agreed, setAgreed] = useState(false);
  const handleLogin = async () => {
    const loginUser = await login({
      phone_number: phoneNumber,
      password: password,
      role_id: 2,
    })
    if (loginUser) {
      router.replace('/(tabs)')
    }
  }
  return (
    <LinearGradient colors={['#E6EEFF', '#FFFFFF']} style={styles.container}>
      <Link href={'/account'} style={styles.closeButton}>
        <Icon name="close" size={24} color="#000" />
      </Link>
      
      <View style={styles.content}>
        <Text style={styles.title}>Xin Chào Bạn</Text>
        <Text style={styles.subtitle}>
          Vui lòng nhập vào số điện thoại của bạn để tiếp tục
        </Text>

        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCode}>
            <Text>🇻🇳 +84</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="123 456 789"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.phoneInputContainer}>
          <TextInput
            style={styles.phoneInput}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </View>     
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreed(!agreed)}
          >
            <Fontisto
              name={agreed ? "checkbox-active" : "checkbox-passive"}
              size={24}
              color="#007AFF"
            />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            Tôi đồng ý với{' '}
            <Text style={styles.link}>điều khoản sử dụng</Text> và{' '}
            <Text style={styles.link}>chính sách bảo mật</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, !agreed && styles.buttonDisabled]}
          disabled={!agreed}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  countryCode: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  checkbox: {
    marginRight: 16,
    minWidth: 30,
  },
  checkboxText: {
    flex: 1,
    color: '#666',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profilePoints: {
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  languageButtonText: {
    color: '#007AFF',
    marginLeft: 10,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#666',
  },
  deleteAccountButton: {
    margin: 20,
    padding: 15,
    alignItems: 'center',
  },
  deleteAccountButtonText: {
    color: '#FF3B30',
  },
  guestHeader: {
    alignItems: 'center',
    padding: 40,
  },
  guestAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  guestTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guestSubtitle: {
    color: '#666',
  },
});
