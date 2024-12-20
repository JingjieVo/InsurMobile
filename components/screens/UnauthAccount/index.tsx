import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import guestAvatar from '@/assets/images/guest_avatar.png'
import { Link } from 'expo-router';
import { TabsBarHeight } from '@/constants/Height';
export default function UnauthAccountScreen () {
  return (
    <LinearGradient colors={['#E6EEFF', '#FFFFFF']} style={styles.container}>
      <View style={styles.guestHeader}>
        <Image
          source={guestAvatar}
          style={styles.guestAvatar}
        />
        <Text style={styles.guestTitle}>Khách</Text>
        <Link href={'/login'} style={styles.guestSubtitle}>Bạn hãy Đăng Nhập tại đây</Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hệ thống</Text>
        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="description" size={24} color="#000" />
          <Text style={styles.menuText}>Điều khoản dịch vụ</Text>
          <FontAwesome name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="shield" size={24} color="#000" />
          <Text style={styles.menuText}>Chính sách về quyền riêng tư</Text>
          <FontAwesome name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.languageButton}>
        <FontAwesome name="language" size={24} color="#007AFF" />
        <Text style={styles.languageButtonText}>English</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: TabsBarHeight
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
      marginBottom: 30,
    },
    checkbox: {
      marginRight: 10,
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